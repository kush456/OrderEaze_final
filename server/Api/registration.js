import express from 'express';
import User from '../modals_database/modal.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
const jwtsecret = 'this is me';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, jwtsecret, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err.message);
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    req.userId = decoded.userId;
    next();
  });
};


router.post('/register', async (req, res) => {
  console.log("hello from the register");
  const {name, phone, password,email } = req.body;
console.log(req.body)
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record in the database
    const userData = await User.create({ name,phone,password: hashedPassword ,email});
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.post('/login', async (req, res) => {
//   const { phone,email,password } = req.body;

//   try {
//     // Find the user by their phone number
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: 'Invalid phone number or password' });
//     }

//     // Compare the password provided with the hashed password in the database
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid phone number or password' });
//     }

//     // If credentials are valid, create a JWT token
//     const tokenPayload = { id: user._id, phone: user.phone };
//     const authToken = jwt.sign(tokenPayload, jwtsecret, { expiresIn: '24h' });

//     res.status(200).json({ message: 'Logged in successfully', authToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Validate password (assuming you have a method for this)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, jwtsecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/order', verifyToken, async (req, res) => {
  const { items, totalAmount } = req.body;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.orders.push({ items, totalAmount });

    await user.save();
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/orderhist', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('orders');
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//next route for payment

export default router;
