import { baseConfig } from '../common/configManager';
import { EsIndex } from '../consts/website';

const { Client } = require('@elastic/elasticsearch');

export class EsService {
  static current: EsService = new EsService();
  private client: any;
  private host = baseConfig.es.host;

  constructor(host?: string) {
    this.client = new Client({
      node: host || this.host, // Elasticsearch endpoint
      // auth: {
      //   apiKey: {
      //     // API key ID and secret
      //     id: 'foo',
      //     api_key: 'bar',
      //   },
      // },
    });
  }

  async CreateIndex(index: string) {
    const res = await this.client.indices.create({
      index,

      mappings: {
        properties: {
          imgExt: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          cnOverview: {
            type: 'text',
            analyzer: 'ik_max_word',
          },
          specValue: {
            properties: {
              maxval: {
                type: 'long',
              },
              numval: {
                type: 'float',
              },
              optionval: {
                type: 'long',
              },
              minval: {
                type: 'long',
              },
              id: {
                type: 'text',
                fields: {
                  keyword: {
                    ignore_above: 256,
                    type: 'keyword',
                  },
                },
              },
              value: {
                type: 'text',
                fields: {
                  keyword: {
                    ignore_above: 256,
                    type: 'keyword',
                  },
                },
              },
            },
          },
          companyName: {
            type: 'text',
            analyzer: 'ik_max_word',
          },
          description: {
            type: 'text',
            analyzer: 'ik_max_word',
          },
          memo: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          gptMetaKeywords: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          gptMetaTitle: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          metaDescription: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          createdAt: {
            type: 'date',
          },
          metaKeywords: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          hasDatasheet: {
            type: 'long',
          },
          price: {
            type: 'double',
          },
          company: {
            properties: {
              cnName: {
                type: 'text',
                analyzer: 'ik_max_word',
              },
              name: {
                type: 'text',
                fields: {
                  keyword: {
                    ignore_above: 256,
                    type: 'keyword',
                  },
                },
              },
              id: {
                type: 'text',
                fields: {
                  keyword: {
                    ignore_above: 256,
                    type: 'keyword',
                  },
                },
              },
            },
          },
          id: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          isFeatured: {
            type: 'long',
          },
          updatedAt: {
            type: 'date',
          },
          overview: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          updatedBy: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          gptMetaDescription: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          gptFeatures: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          richContent: {
            type: 'text',
          },
          companyId: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          cnName: {
            type: 'text',
            analyzer: 'ik_max_word',
          },
          isEnabled: {
            type: 'long',
          },
          metaTitle: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          name: {
            type: 'keyword',
          },
          partNumber: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          category: {
            properties: {
              cnName: {
                type: 'text',
                analyzer: 'ik_max_word',
              },
              name: {
                type: 'text',
                fields: {
                  keyword: {
                    ignore_above: 256,
                    type: 'keyword',
                  },
                },
              },
              id: {
                type: 'text',
                fields: {
                  keyword: {
                    ignore_above: 256,
                    type: 'keyword',
                  },
                },
              },
            },
          },
          gptDescription: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          categoryId: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          gptApplication: {
            type: 'text',
            fields: {
              keyword: {
                ignore_above: 256,
                type: 'keyword',
              },
            },
          },
          isHot: {
            type: 'long',
          },
        },
      },
    });
    console.log('create index res===>', res);
  }

  async deleteIndex(index: string) {
    await this.client.indices.delete({ index });
  }

  async indexInfo(index: string, id?: string) {
    let obj: any = { index };
    if (id) {
      obj.id = id;
    }
    const res = await this.client.get(obj);
    return res;
  }

  async bulkInsertDoc2Index(body: any[]) {
    try {
      const response = await this.client.bulk({
        body,
      });
    } catch (error) {
      console.log('insert error', error);
    }
  }

  async searchDocByParams(params: {
    index?: string;
    offset: number;
    limit: number;
    specification: { string: { type: number; values: [number] } };
  }) {
    let { index = EsIndex.OE1_SPECVALUE, offset: from, limit: size, specification } = params;
    size = size || 10000;

    // 规格查询条件间是“且”的关系
    // 因此每次迭代都从已知的产品列表中做进一步的筛选
    let productIds = [];
    for (const specId in specification) {
      let query: any = {
        bool: {
          must: [
            {
              match: {
                specificationId: specId,
              },
            },
          ],
        },
      };
      if (productIds.length) {
        query.bool.must.push({
          terms: {
            productId: productIds,
          },
        });
      }

      const specValue = specification[specId];
      if (specValue.type === 1) {
        const min = specValue.values[0];
        const max = specValue.values[1];
        if (min == null) {
          if (max) {
            query.bool.must.push({
              bool: {
                should: [
                  {
                    range: {
                      numval: {
                        lte: max,
                      },
                    },
                  },
                  {
                    range: {
                      minval: {
                        lte: max,
                      },
                    },
                  },
                ],
              },
            });
          }
        } else {
          if (max == null) {
            query.bool.must.push({
              bool: {
                should: [
                  {
                    range: {
                      numval: {
                        gte: min,
                      },
                    },
                  },
                  {
                    range: {
                      maxval: {
                        gte: min,
                      },
                    },
                  },
                ],
              },
            });
          } else {
            query.bool.must.push({
              bool: {
                should: [
                  {
                    range: {
                      numval: {
                        gte: min,
                        lte: max,
                      },
                    },
                  },
                  {
                    bool: {
                      must: [
                        {
                          range: {
                            minval: {
                              lte: max,
                            },
                          },
                        },
                        {
                          range: {
                            maxval: {
                              gte: min,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            });
          }
        }
      } else if (specValue.type === 2) {
        let queryValue = 0;
        for (const value of specValue.values) {
          queryValue |= value;
        }
        query.bool.must.push({
          match: {
            optional: queryValue,
          },
        });
      } else {
        // Unknown spec type
        const unknownSpecValue: any = specValue;
        console.log('Unknown product spec type: ' + String(unknownSpecValue.type));
      }
      console.log('final query==>', size, from, JSON.stringify(query));
      const res = await this.client.search({
        index,
        from, // 从哪条开始，类似于mysql查询的offset
        size, // 每次返回多少条，默认10
        query,
        // min_score: baseConfig.es.paramsMinScore, // 搜索的最低分值，低于该分值的不返回
        _source: ['productId'],
      });
      if (res && res.hits) {
        console.log('命中的数据有多少条==>', res.hits.hits.length);
        const { hits } = res.hits;
        productIds = [];
        for (let v of hits) {
          productIds.push(v._source.productId);
        }
      }
    }
    return productIds;
  }

  async searchDocByKeyword(params: {
    index?: string;
    keyword: string;
    isEnabled: boolean;
    from: number;
    size: number;
  }) {
    let { index = EsIndex.OE1_PRODUCT, from, size, isEnabled = true } = params;
    let query = {
      bool: {
        must: {
          term: {
            isEnabled: Number(isEnabled),
          },
        },
        should: [
          {
            multi_match: {
              query: params.keyword,
              type: 'best_fields',
              fields: ['name^2', 'cnName^2', 'overview', 'cnOverview', 'companyName', 'category.cnName'],
            },
          },
        ],
      },
    };
    const res = await this.client.search({
      index,
      from, // 从哪条开始，类似于mysql查询的offset
      size, // 每次返回多少条，默认20
      query,
      min_score: baseConfig.es.productMinScore, // 搜索的最低分值，低于该分值的不返回
      _source: [
        'id',
        'name',
        'cnName',
        'overview',
        'cnOverview',
        'companyId',
        'categoryId',
        'imgExt',
        'company',
        'category',
      ],
    });
    if (res && res.hits) {
      console.log('命中的数据有多少条==>', res.hits.hits.length);
      const { hits } = res.hits;
      let result = [];
      for (let v of hits) {
        result.push(v._source);
      }

      return {
        total: res.hits.total.value,
        products: result,
      };
    }
    return {
      total: 0,
      products: [],
    };
  }
}
