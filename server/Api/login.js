// import express from "express";
// import menu from "../modals_database/modal.js"
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken"

// const router = express.Router();

// router.get("/",(req,res)=>{
//     // res.send("api calling")

// })


//     router.post("/login", async (req, res) => {
//         let email = req.body.email;
//         let password = req.body.password;
      
//         try {
//           const user = await menu.findOne({ email });

//         console.log(user)
//           if (!user) {
//             return res.status(400).json({ error: "Invalid email or password" });
//           }
      
//           const isPasswordValid = await bcrypt.compare(password, user.password);
//           if (!isPasswordValid) {
//             return res.status(400).json({ error: "Invalid email or password" });
//           }
      
//           const tokenPayload = { id: user._id, email: user.email };
//           const authToken = jwt.sign(tokenPayload, jwtsecret, { expiresIn: "24h" });
      
//           res.status(200).json({ message: "Logged in successfully", authToken });
//         } catch (error) {
//           console.error(error);
//           res.status(500).json({ error: "Internal Server Error" });
//         }
//       });
  


// export default router;;