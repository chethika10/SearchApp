const elasticSearch = require('elasticsearch');
require('dotenv').config();

const client = new elasticSearch.Client({
  host: process.env.URL,
});


async function getAllMetaphors(req, res) {
    try {
        const result = await client.search(
          {
            index: 'my-sinhala-metaphors',
            body: {
              query: {
                match_all: {}
              },
              size: 200,
            }
          }
        );
        res.json(result.hits.hits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
};


async function searchMetaphors(req, res) {
    try {
        const { source, target, lyricist, poem, year,book} = req.body;
        const mustQueries = [];
    
        if (source) mustQueries.push({ match: { source: source } });
        if (lyricist) mustQueries.push({ match: { lyricist: lyricist } });
        if (poem) mustQueries.push({ match: { poem: poem } });
        if (target) mustQueries.push({ match: { target: target } });
        if (year) mustQueries.push({ match: { year: year } });
        if (book) mustQueries.push({ match: { book: book } });
    
        if (mustQueries.length === 0) {
          return res.status(400).send({ message: 'Search parameters are empty' });
        }
        console.log(mustQueries)
    
        const data = await client.search({
          index: 'my-sinhala-metaphors',
          size: 100,
          body: {
            query: {
              bool: {
                must: mustQueries,
              },
            },
          },
        });
    
        res.status(200).send(data.hits.hits);
      } catch (error) {
        console.log('error', error);
        res.status(400).send({ error: error, message: 'Internal server error' });
      }
}

module.exports = { getAllMetaphors, searchMetaphors };