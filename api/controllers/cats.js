const catsRouter = require('express').Router();
const Cat = require('../models/cat');
const client = require('../utils/redis');
var _ = require('lodash');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    const excludeFields = ['page', 'sort', 'limit'];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (queryObj.search !== 'all')
      this.query.find({ imageId: { $regex: queryObj.search } });

    this.query.find();
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 6;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

catsRouter.get('/', async (req, res) => {
  try {
    const searchTerm = 'cat';

    client.get(searchTerm, async (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(result); // Prints "value"
        if (result) {
          res.json({
            status: true,
            message: 'data retrieved from the cache',
            data: { cat: JSON.parse(result) },
          });
        } else {
          const cats = await Cat.find({});
          random = _.shuffle(cats);
          console.log(random);
          await client.set(searchTerm, JSON.stringify(random[0]));
          await client.expire(searchTerm, 10); // 1 hour
          res.json({
            status: true,
            message: 'cache miss',
            data: { cat: random[0] },
          });
        }
      }
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong f.', data: error });
  }
});

catsRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cat = await Cat.findById(id);
    if (!cat)
      return res.status(404).json({ error: 'This cat does not exist.' });

    res.status(200).json({ status: true, message: 'success', cat });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong h.', data: error });
  }
});

catsRouter.post('/', async (req, res) => {
  try {
    const body = req.body;

    const cat = new Cat({
      imageId: body.imageId,
    });

    const savedCat = await cat.save();

    res.status(201).json({
      status: true,
      message: 'New cat created.',
      data: { cat: savedCat },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: 'Something went wrong j.', data: error });
  }
});

module.exports = catsRouter;
