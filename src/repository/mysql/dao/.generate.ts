import path from 'path';
import * as fs from 'fs';

async function main() {
  const filePath = path.resolve(__filename, '..');
  const files = fs.readdirSync(filePath);
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    if (!fileName || fileName === 'data' || fileName === '.generate.ts' || fileName === 'baseDao.ts') {
      continue;
    }
    let className = fileName.split('.')[0];
    className = className.substring(0, 1).toUpperCase() + className.substring(1, className.length);
    const str = daoStr(className);
    fs.writeFileSync(filePath + '/' + fileName, str);
  }
}

const daoStr = (className: string) => `
import { FindOptions } from 'sequelize';

import { BaseDao } from './baseDao';
import { IQueryParams } from './data/IQueryParams';
import { ${className}, I${className} } from '../models/${className}';

export class ${className}Dao extends BaseDao {
static current: ${className}Dao = new ${className}Dao();

async create(entity: I${className}) :Promise<${className}>{ 
return ${className}.create(entity);
}

async update(params: I${className}, entity: I${className}):Promise<void>{ 
await ${className}.update(params, { where: { ...entity } });
}

async findOrCreate(queryParams: I${className}, createParams: I${className}): Promise<${className}> {
const [data] = await ${className}.findOrCreate({
where: { ...queryParams },
defaults: createParams,
});
return data;
}

delete(params: I${className}){ 
return ${className}.destroy({
where: { ...params },
});
}

async getById(id:string):Promise<${className}>{ 
return await ${className}.findByPk(id, { raw: true });
}

async findOne(params: I${className}, options?: FindOptions): Promise<${className}>{
if (!options) {
options = { raw: true
};
}
if (options && options.raw === undefined) {
options.raw = true;
}
return ${className}.findOne({
where: { ...params },
...options,
});
}

async findAll(params: I${className},  options?: FindOptions): Promise<${className}[]>{
if (!options) {
options = { raw: true
};
}
if (options && options.raw === undefined) {
options.raw = true;
}
return ${className}.findAll({
where: { ...params },
...options,
});
}

async findAndCountAll(params: I${className},  options?: FindOptions): Promise<{rows: ${className}[], count: number}>{
if (!options) {
options = { raw: true
};
}
if (options && options.raw === undefined) {
options.raw = true;
}
return ${className}.findAndCountAll({
where: { ...params },
...options
});
}

async count(params: I${className},  options?: FindOptions): Promise<number>{
return ${className}.count({
where: { ...params },
...options,
});
}
}
export interface QueryParams extends I${className}, IQueryParams{
}
`;

// main();
