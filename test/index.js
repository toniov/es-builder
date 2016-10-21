'use strict';

const expect = require('chai').expect;
const qb = require('../src');
const QueryBuilder = qb.QueryBuilder;
const BoolQuery = qb.BoolQuery;
const Q = qb.Q;

describe('QueryBuilder', () => {
  it('should build empty query', () => {
    const query = QueryBuilder().built;
    expect(query).to.eql({ bool: {} });
  });

  it('should add must query', () => {
    const query = QueryBuilder().query({}).built;
    expect(query).to.eql({
      bool: {
        must: {}
      }
    });
  });

  it('should add must not query', () => {
    const query = QueryBuilder().queryMustNot({}).built;
    expect(query).to.eql({
      bool: {
        must_not: {}
      }
    });
  });

  it('should add should query', () => {
    const query = QueryBuilder().queryShould({}).built;
    expect(query).to.eql({
      bool: {
        should: {}
      }
    });
  });

  it('should add filter must query', () => {
    const query = QueryBuilder().filter({}).built;
    expect(query).to.eql({
      bool: {
        filter: {
          bool: {
            must: {}
          }
        }
      }
    });
  });

  it('should add filter must not query', () => {
    const query = QueryBuilder().filterMustNot({}).built;
    expect(query).to.eql({
      bool: {
        filter: {
          bool: {
            must_not: {}
          }
        }
      }
    });
  });

  it('should add filter should query', () => {
    const query = QueryBuilder().filterShould({}).built;
    expect(query).to.eql({
      bool: {
        filter: {
          bool: {
            should: {}
          }
        }
      }
    });
  });

  it('should call aliases correctly', () => {
    let query = QueryBuilder().query({});
    let queryAlias = QueryBuilder().queryAnd({});
    expect(JSON.stringify(query)).to.eql(JSON.stringify(queryAlias));

    query = QueryBuilder().queryMustNot({});
    queryAlias = QueryBuilder().queryMustNot({});
    expect(JSON.stringify(query)).to.eql(JSON.stringify(queryAlias));

    query = QueryBuilder().queryShould({});
    queryAlias = QueryBuilder().queryOr({});
    expect(JSON.stringify(query)).to.eql(JSON.stringify(queryAlias));
  });
});

describe('MatchQuery', () => {
  it('should create match query', () => {
    const query = qb.MatchQuery('description', 'Pink, fluffy and very hungry').built;
    expect(query).to.eql({
      match: {
        description: {
          query: 'Pink, fluffy and very hungry'
        }
      }
    });
  });

  it('should create match query with extra options', () => {
    const query = qb.MatchQuery('description', 'Pink, fluffy and very hungry', { operator: 'and', zero_terms_query: 'all' }).boost(3).built;
    expect(query).to.eql({
      match: {
        description: {
          query: 'Pink, fluffy and very hungry',
          operator: 'and',
          zero_terms_query: 'all',
          boost: 3
        }
      }
    });
  });
});

describe('TermQuery', () => {
  it('should create term query', () => {
    const query = qb.TermQuery('name', 'Kirby');
    expect(JSON.stringify(query)).to.eql('{"term":{"name":{"value":"Kirby"}}}');
  });

  it('should add boost parameter', () => {
    const query = qb.TermQuery('name', 'Kirby').boost(3);
    expect(JSON.stringify(query)).to.eql('{"term":{"name":{"value":"Kirby","boost":3}}}');
  });
});

describe('TermsQuery', () => {
  it('should create terms query', () => {
    const query = qb.TermsQuery('name', ['Kirby', 'Metaknight']);
    expect(JSON.stringify(query)).to.eql('{"terms":{"name":{"value":["Kirby","Metaknight"]}}}');
  });

  it('should add boost parameter', () => {
    const query = qb.TermsQuery('name', ['Kirby', 'Metaknight']).boost(3);
    expect(JSON.stringify(query)).to.eql('{"terms":{"name":{"value":["Kirby","Metaknight"],"boost":3}}}');
  });
});

describe('RangeQuery', () => {
  it('should create range query without including lower and upper', () => {
    const query = qb.RangeQuery('age').gt(8).lt(10);
    expect(JSON.stringify(query)).to.eql('{"range":{"age":{"gt":8,"lt":10}}}');
  });

  it('should create range query including lower and upper', () => {
    const query = qb.RangeQuery('age').gte(8).lte(10);
    expect(JSON.stringify(query)).to.eql('{"range":{"age":{"gte":8,"lte":10}}}');
  });

  it('should create range query less than', () => {
    const query = qb.RangeQuery('age').lt(10);
    expect(JSON.stringify(query)).to.eql('{"range":{"age":{"lt":10}}}');
  });

  it('should add boost parameter', () => {
    const query = qb.RangeQuery('age').lt(10).boost(2);
    expect(JSON.stringify(query)).to.eql('{"range":{"age":{"lt":10,"boost":2}}}');
  });
});

describe('ExistsQuery', () => {
  it('should create exists query', () => {
    const query = qb.ExistsQuery('name');
    expect(JSON.stringify(query)).to.eql('{"exists":{"field":"name"}}');
  });

  it('should add boost parameter', () => {
    const query = qb.ExistsQuery('name').boost(3);
    expect(JSON.stringify(query)).to.eql('{"exists":{"field":"name","boost":3}}');
  });
});

describe('PrefixQuery', () => {
   it('should create prefix query', () => {
    const query = qb.PrefixQuery('name', 'Kir');
    expect(JSON.stringify(query)).to.eql('{"prefix":{"name":{"value":"Kir"}}}');
  });

  it('should add boost parameter', () => {
    const query = qb.PrefixQuery('name', 'Kir').boost(3);
    expect(JSON.stringify(query)).to.eql('{"prefix":{"name":{"value":"Kir","boost":3}}}');
  });
});

describe('Q', () => {
  it('should create queries properly using the shortcut function', () => {
    const queries = [
      Q('term', 'name', 'Kirby'),
      Q('exists', 'name')
    ];

    expect(JSON.stringify(queries)).to.eql(JSON.stringify([
      qb.TermQuery('name', 'Kirby'),
      qb.ExistsQuery('name', 'Kirby')
    ]));
  });
});

describe('BoolQuery', () => {
  it('should build empty bool query', () => {
    const query = BoolQuery();
    expect(JSON.stringify(query)).to.eql('{"bool":{}}');
  });

  it('should add must to bool query', () => {
    const query = BoolQuery().must({});
    expect(JSON.stringify(query)).to.eql('{"bool":{"must":{}}}');
  });

  it('should add must not to bool query', () => {
    const query = BoolQuery().mustNot({});
    expect(JSON.stringify(query)).to.eql('{"bool":{"must_not":{}}}');
  });

  it('should add should to bool query', () => {
    const query = BoolQuery().should({});
    expect(JSON.stringify(query)).to.eql('{"bool":{"should":{}}}');
  });

  it('should call aliases correctly', () => {
    let query = BoolQuery().must({});
    let queryAlias = BoolQuery().and({});
    expect(JSON.stringify(query)).to.eql(JSON.stringify(queryAlias));

    query = BoolQuery().mustNot({});
    queryAlias = BoolQuery().not({});
    expect(JSON.stringify(query)).to.eql(JSON.stringify(queryAlias));

    query = BoolQuery().should({});
    queryAlias = BoolQuery().or({});
    expect(JSON.stringify(query)).to.eql(JSON.stringify(queryAlias));
  });
});

describe('Complex query', () => {
  it('should build a nested query', () => {
    const query = QueryBuilder().filter(Q('terms', 'name', ['Kirby', 'Metaknight'])).filter(Q('exists', 'age'));
    const boolQuery = BoolQuery().should(Q('range', 'age').gt(20).lt(25)).should(Q('prefix', 'surname', 'Ki'));
    query.filter(boolQuery);
    const builtQuery = query.built;
    // console.log(require('util').inspect(builtQuery, { depth: null, colors: true }));
    expect(builtQuery).to.eql({
      bool: {
        filter: {
          bool: {
            must: [{
              terms: {
                name: {
                  value: ['Kirby', 'Metaknight']
                }
              }
            }, {
              exists: {
                field: 'age'
              }
            }, {
              bool: {
                should: [{
                  range: {
                    age: {
                      gt: 20,
                      lt: 25
                    }
                  }
                }, {
                  prefix: {
                    surname: {
                      value: 'Ki'
                    }
                  }
                }]
              }
            }]
          }
        }
      }
    });
  });
});