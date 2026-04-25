const mongoose = require('mongoose');
const User = require('../models/usersModel');
const dotenv = require('dotenv');

dotenv.config();

const createAdminUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({ email: 'MAGICS' });

    if (!adminExists) {
      const admin = new User({
        name: 'Admin',
        email: 'MAGICS',
        password: 'M_86pn',
        isAdmin: true,
      });

      await admin.save();
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createAdminUser();