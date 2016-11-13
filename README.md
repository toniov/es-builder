# Elasticsearch Query Builder

[![Build Status](https://travis-ci.org/antonvs2/es-builder.svg?branch=master)](https://travis-ci.org/antonvs2/es-builder)

Elasticsearch query builder for Node.js, build compatible queries with the Elasticsearch 2.x DSL. Because creating complex queries using the Query DSL is a pain.

It just builds the `query` element within the search request body, the complex part. This means that fields like `size` or `from` must be added separately, as well as the likes of `sort`.

[Info about Search parameters.](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-body.html#_parameters_4)

# Installation

The package can be installed as a local module, to be required in your code.

```js
npm install es-builder
```

Also, it can be installed globally, ready to be used through the Node.js REPL.

```js
npm install -g es-builder
```

# Features

- No production dependencies
- Can be required as a module or used in the command line
- Chainable methods
- `built` getter method returns a copy of the object so it can be safely passed to foreign code

# Usage

## Used as a local module

It is compatible with the [Elasticsearch official client library](https://github.com/elastic/elasticsearch-js):

```js
const eb = require('es-builder');
var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

const query = QueryBuilder()
  .query(eb.TermQuery('name', 'Kirby'))
  .query(eb.MatchQuery('description', 'Pink, fluffy and very hungry'))
  .queryMustNot(eb.TermQuery('name', 'Waddle Dee'));

// stringifying the object will give the following result
// JSON.stringify(query)
// {
//   "bool": {
//     "must": [{
//       "term": {
//         "name": "Kirby"
//       }
//     }, {
//       "match": {
//         "description": {
//           "query": "Pink, fluffy and very hungry"
//         }
//       }
//     }],
//     "must_not": {
//       "term": {
//         "name": "Waddle Dee"
//       }
//     }
//   }
// }

// but the created query can be passed like that, since the Elasticsearch client will stringify it internally after
client.search({
  index: 'games',
  type: 'dreamland',
  body: {
    query: query
  }
}, function(err, resp) {
  // result of the search here
  ...
});

```

## Used as a global module (REPL)

All the query classes has been exposed to the REPL so they can be called directly.

```zsh
$ es-builder

es-builder> query = QueryBuilder().query(TermQuery('name', 'Kirby')).query(MatchQuery('description', 'Pink, fluffy and very hungry')).queryMustNot(TermQuery('name', 'Waddle Dee'));

es-builder> query.stringified
'{"bool":{"must":[{"term":{"name":{"value":"Kirby"}}},{"match":{"description":{"query":"Pink, fluffy and very hungry"}}}],"must_not":{"term":{"name":{"value":"Waddle Dee"}}}}}'

es-builder> .exit
```

Copy the result above and paste it in your curl search request

```zsh
$ curl -XGET 'http://localhost:9200/games/dreamland/_search' -d'
{
    "query" : {"bool":{"must":[{"term":{"name":{"value":"Kirby"}}},{"match":{"description":{"query":"Pink, fluffy and very hungry"}}}],"must_not":{"term":{"name":{"value":"Waddle Dee"}}}}}
}'
```

## Filter context

Adding clauses to filter context is possible as well:

```js
query.filter(eb.TermQuery('name', 'Kirby'));

// stringifying the object will give the following result
// JSON.stringify(query)
// {
//   "bool": {
//     "filter": {
//       "bool": {
//         "must": {
//           "term": {
//             "name": "Kirby"
//           }
//         }
//       }
//     }
//   }
// }
```

NOTE: The above query is quite simple, so using the Query DSL directly it could be written shorter:

```json
{
  "bool": {
    "filter": {
      "term": {
        "name": "Kirby"
      }
    }
  }
}
```

To Elasticsearch both of them are the same, therefore using this utility, the resultant JSON becomes longer for the sake of keeping the code as simple as possible.

## Shortcut for leaf query clauses

There is a shortcut available for leaf query clauses when used as a local module, inspired by [elasticsearch-dsl-py](https://github.com/elastic/elasticsearch-dsl-py)

```js
const Q = eb.Q;
const TermsQuery = eb.TermsQuery;

// doing this
Q('terms', 'name', ['Kirby', 'Metaknight']);
// equals
TermsQuery('name', ['Kirby', 'Metaknight'])

// both giving the same result:
// {
//  "terms": {
//    "name": ["Kirby", "Metaknight"]
//  }
// }
```

Also, there is a one-to-one mapping relation between the raw query and its equivalent in the DSL, therefore adding directly raw queries as Javascript objects is fine.

```js
const eb = require('es-builder');
eb.QueryBuilder().query({ terms: name: ['Kirby', 'Metaknight'] }).built;

// same result:
//
// {
//   bool: {
//    must: {
//     terms: {
//        name: [ 'Kirby', 'Metaknight' ]
//        }
//      }
//    }
//  }
// }
```

## Complex queries

Combined queries can be built nesting compound query clauses.

```js
const eb = require('es-builder');
const Q = eb.Q;

const query = eb.QueryBuilder();
// add a couple of filters
query
  .filter(Q('terms', 'name', ['Kirby', 'Metaknight']))
  .filter(Q('exists', 'age'));

// create a bool compound query
const boolQuery = eb.BoolQuery()
  .should(Q('range', 'age').gt(20).lt(25))
  .should(Q('prefix', 'surname', 'Ki'));

// nest it
query.filter(boolQuery);

// stringifying the object will give the following result
// JSON.stringify(query)
// {
//   "bool": {
//     "filter": {
//       bool: {
//         "must": [{
//           "terms": {
//             "name": {
//               "value": ["Kirby", "Metaknight"]
//             } 
//           }
//         }, {
//           "exists": {
//             "field": "age"
//           }
//         }, {
//           "bool": {
//             "should": [{
//               "range": {
//                 "age": { "gt": 20, "lt": 25 }
//               }
//             }, {
//               "prefix": {
//                 "surname": {
//                   "value": "Ki"
//                 }
//               }
//             }]
//           }
//         }]
//       }
//     }
//   }
// }
```

## Aliases

There are aliases available for some methods.

`const queryBuilder = eb.QueryBuilder();`
- `queryBuilder.query()` → `queryBuilder.queryAnd()`
- `queryBuilder.queryMustNot()` → `queryBuilder.queryNot()`
- `queryBuilder.queryShould()` → `queryBuilder.queryOr()`
- `queryBuilder.filter()` → `queryBuilder.filterAnd()`
- `queryBuilder.filterMustNot()` → `queryBuilder.filterNot()`
- `queryBuilder.filterShould()` → `queryBuilder.filterOr()`

`const boolQuery = eb.BoolQuery();`
- `boolQuery.must()` → `boolQuery.and()`
- `boolQuery.mustNot()` → `boolQuery.not()`
- `boolQuery.should()` → `boolQuery.or()`

# API

Coming soon. 

At the moment you can take a look to the tests to see how all the methods work.

# Compatibility

- Compatible with Elasticsearch 2.x search API
- Node.js version
  - As a required module: It has been transpiled to ES5 using [Babel](https://babeljs.io/), so it is compatible with old Node.js versions (> 0.12.0)
  - As a global module (REPL): > 6.0.0


# ToDo List

- Add leaf query clauses like `multi_match` or `fuzzy`
- Add compound query clauses like `constant_score` or `dis_max`
- Allow passing array of filter objects in compound query clauses
- Browser compatible
- And more

Pull requests or any comments are more than welcome.
