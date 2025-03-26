const express = require('express');
const router = express.Router();
const Category = require('../model/Category');

// Hiển thị danh sách categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('categories', { categories });
  } catch (error) {
    res.status(500).send('Lỗi khi lấy danh sách categories');
  }
});

module.exports = router;
