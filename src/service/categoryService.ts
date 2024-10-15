import { Op } from 'sequelize';
import { defaultRedis, getOrSetStringCache } from '../common/redisHelper';
import { genSnowflakeId } from '../common/utils/random';
import { CacheExpireTime, CategoryIdKey, CategoryListKey, subCategoryIdKey } from '../consts/cache-keys';
import { CategoryDao } from '../repository/mysql/dao/category';
import { LogDao } from '../repository/mysql/dao/log';
import { Category, ICategory } from '../repository/mysql/models/Category';
import { SpecificationService } from './specificationService';
import { ProductDao } from '../repository/mysql/dao/product';
import { ProductStatus } from '../common/yz-utils/consts/product';
import { InterfaceType } from '../consts/website';

interface treeCategory extends ICategory {
  companyCount: number;
  productCount: number;
  children: any[];
}

export interface IQueryCategoryParams {
  isEnabled?: number | string;
  parentId?: string;
  withCount?: string;
  pickParam?: string;
  interfaceType?: InterfaceType.Web;
}

export class CategoryService {
  static current: CategoryService = new CategoryService();

  constructor() {}

  async getCateMap() {
    const categories = await CategoryDao.current.findAll({});
    let cMap = new Map();
    for (let c of categories) {
      cMap.set(c.id, c);
    }
    return cMap;
  }

  // 通过缓存获取
  async queryByCache(params: IQueryCategoryParams): Promise<any> {
    const cacheKey = CategoryListKey(JSON.stringify(params));
    const cache = await getOrSetStringCache(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }

    const res = await this.query(params);
    await getOrSetStringCache(cacheKey, JSON.stringify(res));
    return res;
  }

  // 查询列表
  async query(params: IQueryCategoryParams): Promise<any> {
    let categories: any[] = await this.queryAllCategoriesByParams(params);
    let result;

    if (params.withCount && params.withCount == 'product') {
      const everyCategoryProductCount = await this.statisticsEveryCategoryProductCount(params.interfaceType);
      result = this.buildTreeWithProductCount(categories, everyCategoryProductCount, params.interfaceType);
    } else {
      result = this.buildTree(categories);
    }

    return result;
  }

  // 通过筛选项获取分类信息的方法
  async queryAllCategoriesByParams(params: IQueryCategoryParams) {
    const { isEnabled, parentId, pickParam } = params;

    const where: any = {};
    if (parentId) {
      if (parentId == 'null') {
        where.parentId = null;
      } else {
        // 查询一级分类及其子分类
        Object.assign(where, {
          [Op.or]: {
            id: parentId,
            parentId,
          },
        });
      }
    }

    if (isEnabled != undefined) {
      switch (isEnabled) {
        case 'true':
          where.isEnabled = 1;
          break;
        case 'false':
          where.isEnabled = 0;
          break;
        default:
          where.isEnabled = Number(isEnabled);
          break;
      }
    }

    let findAllOptions: any = {
      order: [['order', 'ASC']],
    };
    if (pickParam) {
      findAllOptions.attributes = pickParam?.split(',');
    }
    global.logger.info({
      message: 'category query where--->',
      data: { where, findAllOptions },
    });
    return await CategoryDao.current.findAll(where, findAllOptions);
  }

  // 构建无限极分类树
  private buildTree(categories: any[], parentId: string | null = null) {
    const tree: any[] = [];
    const children = categories.filter((category) => category.parentId === parentId);
    for (const child of children) {
      const childWithSubtree = {
        ...child,
        children: this.buildTree(categories, child.id),
      };
      tree.push(childWithSubtree);
    }
    return tree;
  }

  // 统计每个分类的产品数量，返回一个分类对于的数量map
  async statisticsEveryCategoryProductCount(interfaceType: InterfaceType): Promise<Map<string, number>> {
    let secondLeveleCateProductCountMap = new Map();
    let firstLeveleCateProductCountMap = new Map();

    const categoryMap = await this.getCategoryIdAndParentIdMap();

    let querySql = 'SELECT categoryId,count(*) as count from product GROUP BY categoryId;';
    if (interfaceType === InterfaceType.Web) {
      querySql = 'SELECT categoryId,count(*) as count from product where status=1 GROUP BY categoryId';
    }

    const [categoryProductCount] = (await Category.sequelize.query(querySql)) as any;
    for (let v of categoryProductCount) {
      if (interfaceType === InterfaceType.Web && !v.count) {
        continue;
      }

      if (!secondLeveleCateProductCountMap.has(v.categoryId)) {
        secondLeveleCateProductCountMap.set(v.categoryId, Number(v.count));
      }
      // 获取一级分类的数量
      const firstLeveleCategoryId = categoryMap.categoryIdToParentIdMap.get(v.categoryId);
      if (firstLeveleCategoryId) {
        const firstLeveleCategoryCount = firstLeveleCateProductCountMap.get(firstLeveleCategoryId);
        if (!firstLeveleCategoryCount) {
          firstLeveleCateProductCountMap.set(firstLeveleCategoryId, Number(v.count));
        } else {
          const newCount = firstLeveleCategoryCount + Number(v.count);
          firstLeveleCateProductCountMap.set(firstLeveleCategoryId, newCount);
        }
      }
    }

    return new Map([...firstLeveleCateProductCountMap, ...secondLeveleCateProductCountMap]);
  }

  // 构建无限极分类树，并加上每个分类的产品数量
  private buildTreeWithProductCount(
    categories: any[],
    everyCategoryProductCount: Map<any, any>,
    interfaceType: InterfaceType,
    parentId: string | null = null,
  ) {
    const tree: any[] = [];
    const children = categories.filter((category) => category.parentId === parentId);
    for (const child of children) {
      const productCount = everyCategoryProductCount.get(child.id) || 0;
      if (interfaceType === InterfaceType.Web && !productCount) {
        continue;
      }
      const childWithSubtree = {
        ...child,
        productCount,
        children: this.buildTreeWithProductCount(categories, everyCategoryProductCount, interfaceType, child.id),
      };
      tree.push(childWithSubtree);
    }
    return tree;
  }

  // 构建无限极分类树，并加上每个分类的公司数量
  private buildTreeWithCompanyCount(
    categories: any[],
    everyCategoryCompanyCount: Map<any, any>,
    parentId: string | null = null,
  ) {
    const tree: any[] = [];
    const children = categories.filter((category) => category.parentId === parentId);
    for (const child of children) {
      const childWithSubtree = {
        ...child,
        productCount: everyCategoryCompanyCount.get(child.id) || 0,
        children: this.buildTreeWithProductCount(categories, everyCategoryCompanyCount, child.id),
      };
      tree.push(childWithSubtree);
    }
    return tree;
  }

  // 获取Map<id, parentId>
  async getCategoryIdAndParentIdMap() {
    const allCategories = await CategoryDao.current.findAll({}, { attributes: ['id', 'parentId'] });
    let categoryIdToParentIdMap = new Map();
    let firstLevelCategoryArr = [];
    for (const a of allCategories) {
      if (a.parentId) {
        categoryIdToParentIdMap.set(a.id, a.parentId);
      } else {
        firstLevelCategoryArr.push(a.id);
      }
    }
    return { categoryIdToParentIdMap, firstLevelCategoryArr };
  }

  async detailCache(id: string) {
    const cacheKey = CategoryIdKey(id);
    const cache = await getOrSetStringCache(cacheKey);
    if (cache) {
      return JSON.parse(cache);
    }

    const res = await this.detail(id);
    await getOrSetStringCache(cacheKey, JSON.stringify(res));
    return res;
  }

  async detail(id: string): Promise<any> {
    const category: any = await CategoryDao.current.getById(id);
    if (category == null) {
      return null;
    }

    await this.parseParentCategory(category);

    category.specification = await SpecificationService.current.detailByCategory(id);
    return category;
  }

  async parseParentCategory(category: any): Promise<void> {
    if (category == null) {
      return;
    }
    if (category.parentId == null) {
      return;
    }

    const parent = await CategoryDao.current.getById(category.parentId);
    if (parent == null) {
      return;
    }

    await this.parseParentCategory(parent);

    category.parent = parent;
  }

  async create(dto: ICategory, username: string): Promise<any> {
    const entity: any = dto;
    const id = genSnowflakeId();
    entity.id = id;

    await CategoryDao.current.create(entity);

    await LogDao.current.create({
      table: 'category',
      recordId: id,
      action: 1,
      newData: entity,
      optBy: username,
    });

    return entity;
  }

  private async switchRelated(categoryId: string, isEnabled: number): Promise<void> {
    const subCategoryIds = await this.subCategoryIds(categoryId);

    // Switch sub-categories
    await CategoryDao.current.update(
      {
        isEnabled,
      },
      {
        id: {
          [Op.in]: subCategoryIds,
        },
      },
    );

    // Switch products
    await ProductDao.current.update(
      {
        status: isEnabled,
      },
      {
        categoryId: {
          [Op.in]: subCategoryIds,
        },
      },
    );
  }

  async update(id: string, dto: ICategory, username: string): Promise<void> {
    if (Object.keys(dto).length <= 0) {
      return;
    }

    const oldData: any = await CategoryDao.current.findOne({ id });
    if (oldData == null) {
      return;
    }

    if (dto.isEnabled != null) {
      await this.switchRelated(id, dto.isEnabled);
    }

    const fields: any = dto;

    await CategoryDao.current.update(fields, { id });

    await LogDao.current.create({
      table: 'category',
      recordId: id,
      action: 2,
      oldData,
      newData: Object.assign({}, oldData, fields),
      optBy: username,
    });
    await defaultRedis.del(CategoryIdKey(id));
  }

  async delete(id: string, username: string): Promise<void> {
    const childCount = await CategoryDao.current.count({
      parentId: id,
    });
    if (childCount > 0) {
      throw new RangeError('不能删除含有子分类的分类');
    }

    const productCount = await ProductDao.current.count({
      categoryId: id,
    });
    if (productCount > 0) {
      throw new RangeError('不能删除含有产品的分类');
    }

    const oldData: any = await CategoryDao.current.findOne({ id });
    if (oldData == null) {
      return;
    }

    await LogDao.current.create({
      table: 'category',
      recordId: id,
      action: 3,
      oldData,
      optBy: username,
    });

    await CategoryDao.current.delete({ id });
    await defaultRedis.del(CategoryIdKey(id));
  }

  async subCategoryIds(categoryId: string): Promise<any> {
    const subCategoryIdCache = await defaultRedis.get(subCategoryIdKey(categoryId));
    if (subCategoryIdCache) {
      return JSON.parse(subCategoryIdCache);
    }

    let result;
    const children = await CategoryDao.current.findAll({
      parentId: categoryId,
    });
    if (children.length > 0) {
      let ids = [categoryId];
      for (const child of children) {
        ids = ids.concat(await this.subCategoryIds(child.id));
      }

      result = ids;
    } else {
      result = [categoryId];
    }
    await defaultRedis.set(subCategoryIdKey(categoryId), JSON.stringify(result), 'EX', CacheExpireTime);
    return result;
  }

  // GPT设计的，计算无限极分类下，一级分类下的子分类产品总数量
  processCategories(arr: any[]) {
    const calculateProductCount = (node) => {
      if (!node.children || node.children.length === 0) {
        return node.productCount;
      }

      let totalProductCount = node.productCount;

      for (const child of node.children) {
        totalProductCount += calculateProductCount(child);
      }

      return totalProductCount;
    };

    const filterCategories = (node) => {
      if (!node.children || node.children.length === 0) {
        return node.productCount > 0 ? node : null;
      }

      const newChildren = node.children.map(filterCategories).filter((child) => child !== null);

      const newNode = {
        ...node,
        id: node.id,
        productCount: newChildren.reduce((acc, child) => acc + child.productCount, node.productCount),
        children: newChildren,
      };

      return newNode.productCount > 0 ? newNode : null;
    };

    const result = arr
      .map((category) => {
        const newCategory = filterCategories(category);
        if (newCategory) {
          newCategory.productCount = newCategory.children.reduce((acc, child) => acc + child.productCount, 0);
        }
        return newCategory;
      })
      .filter((category) => category !== null);

    return result;
  }
}
