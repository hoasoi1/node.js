const connectMongo = require('./config/connectDB');
const Category = require('./model/Category');

async function seedData() {
  await connectMongo();

  const categories = [
    { name: 'Technology', description: 'All about tech and gadgets' },
    { name: 'Health', description: 'Health and wellness tips' },
    { name: 'Education', description: 'Learning and knowledge sharing' },
  ];

  await Category.insertMany(categories);
  console.log('Dữ liệu Category đã được thêm thành công!');
  process.exit();
}

seedData().catch(err => console.log(err));
