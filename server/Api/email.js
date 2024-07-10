import nodemailer from "nodemailer";

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

// async..await is not allowed in global scope, must use a wrapper
const emailoptions = {
    from: {
        name: "Aman",
        address: "amany29074@gmail.com",  // sender address
  
    }, // sender address
    to: "kushagra_b@bt.iitr.ac.in", // list of receivers
    subject: "Order Confirmation", // Subject line
    text: "thank you for ordering ,yamake kudasai daddy", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

//   console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>

  const sendemail=async(transporter,emailoptions)=>{
    try {
            await transporter.sendMail(emailoptions)
            console.log("Email sent successfully")
    } catch (error) {
        console.log(error)
    }

  }



sendemail(transporter,emailoptions)