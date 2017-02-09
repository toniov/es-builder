'use strict';

const expect = require('chai').expect;
const qb = require('../../src');
const QueryBuilder = qb.QueryBuilder;
const BoolQuery = qb.BoolQuery;
const FunctionScoreQuery = qb.FunctionScoreQuery;
const Q = qb.Q;

describe('QueryBuilder', () => {
  it('should build empty query', () => {
    const query = QueryBuilder().built;
    expect(query).to.eql({ bool: {} });
  });

  it('should add must query', () => {
    const query = QueryBuilder().query({ test: 1 }).built;
    expect(query).to.eql({ test: 1 });
  });

  it('should add multiple must query', () => {
    const query = QueryBuilder().query({ test: 1 }).query({ test2: 2 }).built;
    expect(query).to.eql({ 
      bool: {
        must: [{
          test: 1
        }, {
          test2: 2
        }]
      }
    });
  });

  it('should add must not query', () => {
    const query = QueryBuilder().queryMustNot({ test: 1 }).built;
    expect(query).to.eql({
      bool: {
        must_not: { test: 1 }
      }
    });
  });

  it('should add multiple must not query', () => {
    const query = QueryBuilder().queryMustNot({ test: 1 }).queryMustNot({ test2: 2 }).built;
    expect(query).to.eql({
      bool: {
        must_not: [{
          test: 1 
        }, {
          test2: 2
        }]
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

  it('should add multiple should query', () => {
    const query = QueryBuilder().queryShould({ test: 1 }).queryShould({ test2: 2 }).built;
    expect(query).to.eql({
      bool: {
        should: [{
          test: 1 
        }, {
          test2: 2
        }]
      }
    });
  });

  it('should add filter must query', () => {
    const query = QueryBuilder().filter({}).built;
    expect(query).to.eql({
      bool: {
        filter: {}
      }
    });
  });

  it('should add several filter must queries', () => {
    const query = QueryBuilder().filter({}).filter({}).built;
    expect(query).to.eql({
      bool: {
        filter: [{}, {}]
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

  it('should add multiple filter must not query', () => {
    const query = QueryBuilder().filterMustNot({}).filterMustNot({}).built;
    expect(query).to.eql({
      bool: {
        filter: {
          bool: {
            must_not: [{}, {}]
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

  it('should add multiple filter should query', () => {
    const query = QueryBuilder().filterShould({}).filterShould({}).built;
    expect(query).to.eql({
      bool: {
        filter: {
          bool: {
            should: [{}, {}]
          }
        }
      }
    });
  });

  it('should add filter must and should query', () => {
    const query = QueryBuilder().filter({}).filterShould({}).built;
    expect(query).to.eql({
      bool: {
        filter: {
          bool: {
            must: {},
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
    expect(JSON.stringify(query)).to.eql('{"terms":{"name":["Kirby","Metaknight"]}}');
  });

  it('should add boost parameter', () => {
    const query = qb.TermsQuery('name', ['Kirby', 'Metaknight']).boost(3);
    expect(JSON.stringify(query)).to.eql('{"terms":{"name":["Kirby","Metaknight"],"boost":3}}');
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

describe('FunctionScoreQuery', () => {
  it('should build function score query', () => {
    const fsc = FunctionScoreQuery();
    fsc.boost(5);
    fsc.boostMode('multiply');
    fsc.maxBoost(42);
    fsc.query(qb.MatchQuery('description', 'Pink, fluffy and very hungry'));
    fsc.scoreMode('max');
    fsc.minScore(42);
    fsc.functions({
      filter: { match: { test: 'bar' } },
      weight: 23
    });
    fsc.functions([{
      filter: { match: { test: 'cat' } },
      weight: 42
    },
    {
      random_score: {}
    }]);
    expect(fsc.built).to.eql({
      function_score: {
        boost: 5,
        boost_mode: 'multiply',
        max_boost: 42,
        query: { match: { description: { query: 'Pink, fluffy and very hungry' } } },
        score_mode: 'max',
        min_score: 42,
        functions: [{
          filter: {
            match: { test: 'bar' }
          },
          weight: 23
        },
        {
          filter: {
            match: { test: 'cat' }
          },
          weight: 42
        },
        {
          random_score: {}
        }]
      }
    });
  });
});

describe('Complex query', () => {
  it('should build a nested query', () => {
    const query = QueryBuilder().filter(Q('terms', 'name', ['Kirby', 'Metaknight'])).filter(Q('exists', 'age'));
    const boolQuery = BoolQuery().should(Q('range', 'age').gt(20).lt(25)).should(Q('prefix', 'surname', 'Ki'));
    query.filter(boolQuery);
    const builtQuery = query.built;
    expect(builtQuery).to.eql({
      bool: {
        filter: [{
          terms: {
            name: ['Kirby', 'Metaknight']
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
    });
  });
});