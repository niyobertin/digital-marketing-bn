import { Product } from '../models/products.model';
import { User } from '../models/users.model';

const seedProducts = async () => {
  try {
    const admin = await User.findOne({ role: 'admin' });
    const seller = await User.findOne({ role: 'seller' });

    if (!admin || !seller) {
      console.error('No admin or seller found');
      return;
    }
    const products = [
      {
        name: 'HP Laptop',
        images: ['image1.jpg', 'image2.jpg'],
        description: 'This is best products for daily uses',
        categories: 'electronics',
        price: 100.00,
        createdBy: seller._id, 
      },
      {
        name: 'Shot',
        images: ['image3.jpg', 'image4.jpg'],
        description: 'This is good fashion stylye',
        categories: 'fashion',
        price: 50.00,
        createdBy: seller._id, 
      },
      {
        name: 'Radio',
        images: ['image5.jpg', 'image6.jpg'],
        description: 'This is a music instrument used at home',
        categories: 'home appliances',
        price: 250.00,
        createdBy: admin._id, 
      }
    ];
    for (const productData of products) {
      await Product.create(productData);
    }
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

export default seedProducts;
