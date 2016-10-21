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
- Chainable methods
- `built` getter method returns each time a copy of the object so it can be safely passed to foreign code

# Usage

As a local module:

```js
const eb = require('es-builder');

const queryBuilder = new QueryBuilder()
  .query(eb.TermQuery('name', 'Kirby'))
  .query(eb.MatchQuery('description', 'Pink, fluffy and very hungry'))
  .queryMustNot(eb.TermQuery('name', 'Waddle Dee'));

const builtQuery = queryBuilder.built;
// {
//   bool: {
//     must: [{
//       term: {
//         name: 'Kirby'
//       }
//     }, {
//       match: {
//         description: {
//           query: 'Pink, fluffy and very hungry'
//         }
//       }
//     }],
//     must_not: {
//       term: {
//         name: 'Waddle Dee'
//       }
//     }
//   }
// }
```

Adding clauses to filter context is possible as well:

```js
queryBuilder.filter(eb.TermQuery('name', 'Kirby'));

const builtQuery = queryBuilder.built;
// {
//   bool: {
//     filter: {
//       bool: {
//         must: {
//           term: {
//             name: 'Kirby'
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

There is a shortcut available for leaf query clauses, inspired by [elasticsearch-dsl-py](https://github.com/elastic/elasticsearch-dsl-py)

```js
const Q = eb.Q;

// doing this
Q('terms', 'name', ['Kirby', 'Metaknight']);
// equals
eb.TermsQuery('name', ['Kirby', 'Metaknight'])

// both giving the same result:
// {
//  terms: {
//    name: ['Kirby', 'Metaknight']
//  }
// }
```

Also, there is a one-to-one mapping relation between the raw query and its equivalent in the DSL, therefore adding directly raw queries as Javascript objects is fine.

## Complex queries

Combined queries can be built nesting compound query clauses.

```js
const eb = require('es-builder');
const Q = eb.Q;

const queryBuilder = new eb.QueryBuilder();
// add a couple of filters
queryBuilder
  .filter(Q('terms', 'name', ['Kirby', 'Metaknight']))
  .filter(Q('exists', 'age'));

// create a bool compound query
const builtBoolQuery = new eb.BoolQuery()
  .should(Q('range', 'age', 20, 25))
  .should(Q('prefix', 'surname', 'Pi'))
  .built;

// nest it
queryBuilder.filter(builtBoolQuery);

const builtQuery = queryBuilder.built;
// {
//   bool: {
//     filter: {
//       bool: {
//         must: [{
//           terms: {
//             name: ['Kirby', 'Metaknight']
//           }
//         }, {
//           exists: {
//             field: 'age'
//           }
//         }, {
//           bool: {
//             should: [{
//               range: {
//                 age: { gt: 20, lt: 25 }
//               }
//             }, {
//               prefix: {
//                 surname: 'Ki'
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

`const queryBuilder = new eb.QueryBuilder();`
- `queryBuilder.query()` → `queryBuilder.queryAnd()`
- `queryBuilder.queryMustNot()` → `queryBuilder.queryNot()`
- `queryBuilder.queryShould()` → `queryBuilder.queryOr()`
- `queryBuilder.filter()` → `queryBuilder.filterAnd()`
- `queryBuilder.filterMustNot()` → `queryBuilder.filterNot()`
- `queryBuilder.filterShould()` → `queryBuilder.filterOr()`

`const boolQuery = new eb.BoolQuery();`
- `boolQuery.must()` → `boolQuery.and()`
- `boolQuery.mustNot()` → `boolQuery.not()`
- `boolQuery.should()` → `boolQuery.or()`

# API

Coming soon. 

At the moment you can take a look to the tests to see how all the methods work.

# Compatibility

- Compatible with Elasticsearch 2.x search API
- It has been transpiled to ES5 using [Babel](https://babeljs.io/), so it is compatible with old Node.js versions (> 0.12.0)

# ToDo List

- Add leaf query clauses like `multi_match` or `fuzzy`
- Add compound query clauses like `constant_score` or `dis_max`
- Allow passing array of filter objects in compound query clauses
- Possibility to pass some options to leaf query clauses (like `boost`)
- Browser compatible
- And more

Pull requests or any comments are more than welcome.
