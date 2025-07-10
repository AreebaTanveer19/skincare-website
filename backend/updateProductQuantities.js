const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Update all products to ensure they have a quantity field (default 0 if missing)
    const result = await Product.updateMany(
      { $or: [ { quantity: { $exists: false } }, { quantity: null } ] },
      { $set: { quantity: 2 } }
    );

    console.log(`Updated ${result.modifiedCount} products.`);
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  }); 