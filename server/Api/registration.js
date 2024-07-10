import express from 'express';
import nodemailer from "nodemailer";
import FoodItem from '../modals_database/modal.js';
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

console.log(FoodItem.FoodItem)
console.log(FoodItem.User)


router.get('/menu', async (req, res) => {
  try {
    const fooditem=FoodItem.FoodItem
    const menu = await fooditem.find({});
    res.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/register', async (req, res) => {
  console.log("hello from the register");
  const {name, phone, password,email } = req.body;
console.log(req.body)
  try {
    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record in the database
    const userData = await FoodItem.User.create({ name,phone,password: hashedPassword ,email});
    console.log("details of user",userData);
    console.log('User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    if (email == "aman_y@bt.iitr.ac.in" && password == 123456){
      console.log("inside odin house");
      res.status(200).json({ message:"odin has arrived" });
    } else {
      const user = await FoodItem.User.findOne({ email });
    
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
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/order', verifyToken, async (req, res) => {
  //const { items, totalAmount, status } = req.body;
  console.log("hello from the /order");
  console.log("data from the frontend",req.body);
  const items =req.body.items;
  const userId =req.body.userId;
  const status =req.body.status;
  const totalAmount = req.body.totalAmount;
  const emailAdress = req.body.emailAdress;
  console.log(items, userId,emailAdress,totalAmount);

  try {
    const user = await FoodItem.User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.orders.push({ items, totalAmount, status});

    await user.save();

    const transporter = nodemailer.createTransport({
      service:"gmail.com",
      host: "smtp.gmail.email",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: "amany29074@gmail.com",
        pass: "aego depe zgtk hylw",
      },
    });


    const emailoptions = {
      from: {
          name: "Aman",
          address: "amany29074@gmail.com",  // sender address

      }, // sender address
      to: emailAdress, // list of receivers
      subject: "Order Confirmation", // Subject line
      text: "thank you for ordering ,yamake kudasai daddy", // plain text body
      html: "<b>thank you for ordering ,yamake kudasai daddy</b>", // html body
    };



    const sendemail=async(transporter,emailoptions)=>{
      try {
              await transporter.sendMail(emailoptions)
              console.log("Email sent successfully")
      } catch (error) {
          console.log(error)
      }

    }

    await sendemail(transporter,emailoptions)

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/orderhist', verifyToken, async (req, res) => {
  try {
    const user = await FoodItem.User.findById(req.userId).select('orders');
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

router.get('/placedorders', async (req, res) => {
  try {
    const users = await FoodItem.User.find().select('email orders');

    const response = users.map(user => ({
      email: user.email,
      orders: user.orders
    }));

    res.json(response);
    console.log(response);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

router.get('/placedorders/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const user = await FoodItem.User.findOne({ 'orders._id': orderId }).select('email orders');
    console.log("server useer side" , user);
    if (!user) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    const order = user.orders.find(order => order._id.toString() === orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      email: user.email,
      order: order
    });
    console.log("server side" , order);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update the status of an order
router.patch('/placedorders/:orderId/status',  async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  console.log(req.body);
  try {
    const user = await FoodItem.User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const order = user.orders.id(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await user.save();

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/getUserEmail', verifyToken, async (req, res) => {
  try {
    const user = await FoodItem.User.findById(req.userId).select('email');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ email: user.email });
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/feedback',  async (req, res) => {
  const email = req.body.email;
  const comment  = req.body.comment;
  console.log(req.body)



  console.log("/feedback api called")
  try {
    let user = await FoodItem.User.findOne({ email });
    if (user) {
      console.log("the user from the api database",user);
      user.feedback.push(comment);
    } else {
      user = new FoodItem.User({ email, feedback: [comment] });
    }
    await user.save();
    res.send('Feedback saved successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving feedback.');
  }
});

// Assuming you have a route like this in your backend
router.get('/feedbacks', async (req, res) => {
  try {
      const feedbacks = await FoodItem.User.find().select('email feedback');
      res.json(feedbacks);
  } catch (error) {
      console.error('Error fetching feedbacks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



export default router;