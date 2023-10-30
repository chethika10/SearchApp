const { specs, swaggerUi } = require('./swagger');
const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
app.use(cors());
app.use(express.json());

const {getAllMetaphors,  searchMetaphors } = require('./controllers/metaphor_controller');
/**
 * @swagger
 * /search:
 *   post:
 *     summary: Search metaphors
 *     description: Search for metaphors based on specified criteria.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               source:
 *                 type: string
 *               target:
 *                 type: string
 *               lyricist:
 *                 type: string
 *               poem:
 *                 type: string
 *               year:
 *                 type: string
 *               book:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of metaphors matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *                 message:
 *                   type: string
 *                   description: Error description
 */
app.post('/search', searchMetaphors);
/**
 * @swagger
 * /metaphors:
 *   get:
 *     summary: Get a list of all the metaphors
 *     responses:
 *       200:
 *         description: A list of metaphors
 */
app.get('/metaphors', getAllMetaphors);
app.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});