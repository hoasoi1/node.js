
const Product = require('../model/product');

class ProductController {
  static async index(req, res) {
    try {
      const searchQuery = req.query.search || '';
      const page = parseInt(req.query.page) || 1;
      const limit = 5;
      const skip = (page - 1) * limit;
      const query = searchQuery
        ? {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } }
            ]
          }
        : {};
      const totalProducts = await Product.countDocuments(query);
      const products = await Product.find(query).skip(skip).limit(limit);

      res.render('products', {
        products,
        searchQuery,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit)
      });

    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi server khi lấy danh sách sản phẩm");
    }
  }
  static addForm(req, res) {
    res.render("add_product", { error: null });
  }
  static async create(req, res) {
    const { name, description, price, stock } = req.body;

    if (!name || !price || !stock) {
      return res.render("add_product", { error: "Vui lòng nhập đầy đủ tên, giá và số lượng." });
    }
    try {
      const product = new Product({
        name,
        description: description || '',
        price: parseFloat(price),
        stock: parseInt(stock)
      });
      await product.save();
      res.redirect("/products");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      res.render("add_product", { error: "Không thể thêm sản phẩm." });
    }
  }
  static async editForm(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).send("Không tìm thấy sản phẩm");

      res.render("edit_product", { product });
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi server khi lấy sản phẩm");
    }
  }
  static async update(req, res) {
    try {
      const { name, description, price, stock } = req.body;
      await Product.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock),
      });
      res.redirect("/products");
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi cập nhật sản phẩm");
    }
  }
  static async delete(req, res) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect("/products");
    } catch (err) {
      console.error(err);
      res.status(500).send("Lỗi khi xóa sản phẩm");
    }
  }
}

module.exports = ProductController;
