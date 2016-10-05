'use strict';

const expect = require('chai').expect;
const qb = require('../');
const QueryBuilder = qb.QueryBuilder;
const leafQueries = qb.leafQueries;
const BoolQuery = qb.compoundQueries.BoolQuery;

describe('QueryBuilder', () => {
  it('should build empty query', () => {
    const query = new QueryBuilder().built;
    expect(query).to.eql({ bool: {} });
  });

  it('should add must query', () => {
    const query = new QueryBuilder().query({}).built;
    expect(query).to.eql({
      bool: {
        must: {}
      }
    });
  });

  it('should add must not query', () => {
    const query = new QueryBuilder().queryMustNot({}).built;
    expect(query).to.eql({
      bool: {
        must_not: {}
      }
    });
  });

  it('should add should query', () => {
    const query = new QueryBuilder().queryShould({}).built;
    expect(query).to.eql({
      bool: {
        should: {}
      }
    });
  });

  it('should add filter must query', () => {
    const query = new QueryBuilder().filter({}).built;
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
    const query = new QueryBuilder().filterMustNot({}).built;
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
    const query = new QueryBuilder().filterShould({}).built;
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
    let query = new QueryBuilder().query({}).built;
    let queryAlias = new QueryBuilder().queryAnd({}).built;
    expect(query).to.eql(queryAlias);

    query = new QueryBuilder().queryMustNot({}).built;
    queryAlias = new QueryBuilder().queryMustNot({}).built;
    expect(query).to.eql(queryAlias);

    query = new QueryBuilder().queryShould({}).built;
    queryAlias = new QueryBuilder().queryOr({}).built;
    expect(query).to.eql(queryAlias);
  });
});

describe('leafQueries', () => {
  it('should create match query', () => {
    const query = leafQueries.matchQuery('description', 'Pink, fluffy and very hungry');
    expect(query).to.eql({
      match: {
        description: {
          query: 'Pink, fluffy and very hungry'
        }
      }
    });
  });

  it('should create match query with extra options', () => {
    const query = leafQueries.matchQuery('description', 'Pink, fluffy and very hungry', { operator: 'and', zero_terms_query: 'all' });
    expect(query).to.eql({
      match: {
        description: {
          query: 'Pink, fluffy and very hungry',
          operator: 'and',
          zero_terms_query: 'all'
        }
      }
    });
  });

  it('should create term query', () => {
    const query = leafQueries.termQuery('name', 'Kirby');
    expect(query).to.eql({
      term: {
        name: 'Kirby'
      }
    });
  });

  it('should create terms query', () => {
    const query = leafQueries.termsQuery('name', ['Kirby', 'Metaknight']);
    expect(query).to.eql({
      terms: {
        name: ['Kirby', 'Metaknight']
      }
    });
  });

  it('should create range query without including lower and upper', () => {
    const query = leafQueries.rangeQuery('age', 8, 10);
    expect(query).to.eql({
      range: {
        age: {
          gt: 8,
          lt: 10
        }
      }
    });
  });

  it('should create range query including lower and upper', () => {
    const query = leafQueries.rangeQuery('age', 8, 10, true, true);
    expect(query).to.eql({
      range: {
        age: {
          gte: 8,
          lte: 10
        }
      }
    });
  });

  it('should create range query including lower', () => {
    const query = leafQueries.rangeQuery('age', 8, 10, true);
    expect(query).to.eql({
      range: {
        age: {
          gte: 8,
          lt: 10
        }
      }
    });
  });

  it('should create range query including upper', () => {
    const query = leafQueries.rangeQuery('age', 8, 10, null, true);
    expect(query).to.eql({
      range: {
        age: {
          gt: 8,
          lte: 10
        }
      }
    });
  });

  it('should create exists query', () => {
    const query = leafQueries.existsQuery('name');
    expect(query).to.eql({
      exists: {
        field: 'name'
      }
    });
  });

  it('should create prefix query', () => {
    const query = leafQueries.prefixQuery('name', 'Kir');
    expect(query).to.eql({ 
      prefix: {
        name: 'Kir'
      }
    });
  });

  it('should create queries properly using the shortcut function', () => {
    const Q = leafQueries.shortcut;
    const queries = [Q('term', 'name', 'Kirby'), Q('exists', 'name')];
    expect(queries).to.eql([{ 
      term: {
        name: 'Kirby'
      }
    }, {
      exists: {
        field: 'name'
      }
    }]);
  });
});

describe('compoundQueries', () => {
  it('should build empty bool query', () => {
    const query = new BoolQuery().built;
    expect(query).to.eql({ bool: {} });
  });

  it('should add must to bool query', () => {
    const query = new BoolQuery().must({}).built;
    expect(query).to.eql({
      bool: {
        must: {}
      }
    });
  });

  it('should add must not to bool query', () => {
    const query = new BoolQuery().mustNot({}).built;
    expect(query).to.eql({
      bool: {
        must_not: {}
      }
    });
  });

  it('should add should to bool query', () => {
    const query = new BoolQuery().should({}).built;
    expect(query).to.eql({
      bool: {
        should: {}
      }
    });
  });

  it('should call aliases correctly', () => {
    let query = new BoolQuery().must({}).built;
    let queryAlias = new BoolQuery().and({}).built;
    expect(query).to.eql(queryAlias);

    query = new BoolQuery().mustNot({}).built;
    queryAlias = new BoolQuery().not({}).built;
    expect(query).to.eql(queryAlias);

    query = new BoolQuery().should({}).built;
    queryAlias = new BoolQuery().or({}).built;
    expect(query).to.eql(queryAlias);
  });
});
