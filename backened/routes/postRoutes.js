const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "asd889asdas5656asdas887";
const nodemailer = require("nodemailer");
const PDFDoc = require("pdfkit");
const fs = require("fs");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "kkv987654321@gmail.com",
    pass: "komal@1109",
  },
});

//dbconnection
const db = "mongodb://localhost:27017/neostore";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err.message);
  }
};
connectDB();
//end
const productmodel = require("../db/productSchema");
const addressmodel = require("../db/addressSchema");
const colormodel = require("../db/colorSchema");
const categorymodel = require("../db/categorySchema");
const ordermodel = require("../db/orderSchema");
const registermodel = require("../db/RegisterSchema");

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token == null) {
    res.json({ err: 1, msg: "Token not match" });
  } else {
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Token incorrect" });
      } else {
        console.log("Match");
        next();
      }
    });
  }
}
router.post("/adduser", (req, res) => {
  // console.log(req.body)
  let ins = new registermodel({
    fname: req.body.fname,
    lname: req.body.lname,
    mobile: req.body.mobile,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
  });
  ins.save((err) => {
    if (err) {
      console.log(err);
      res.send("Already Added");
    } else {
      res.send("ok");
    }
  });
});

//////////////////////////////////
router.get("/fetchorder", (req, res) => {
  ordermodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});
//////////////////////////////////////
router.get("/fetchpost", (req, res) => {
  productmodel.find({}, (err, data) => {
    if (err) throw err;

    res.json({ err: 0, data: data });
  });
});
/////////////////////////////////

router.get("/fetchproduct", (req, res) => {
  productmodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});

router.get("/fetchcolor", (req, res) => {
  colormodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});
////////////////////////////////
router.get("/fetchcategory", (req, res) => {
  categorymodel.find({}, (err, data) => {
    if (err) throw err;
    console.log(data);
    res.json({ err: 0, data: data });
  });
});
///////////////////////////////////
router.get("/fetchuser", (req, res) => {
  registermodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});

///////////////////////////////////
router.get("/fetchaddr", (req, res) => {
  addressmodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ err: 0, data: data });
  });
});
/////////////////////////////////////
router.post("/edituser", (req, res) => {
  console.log(req.body.id);

  console.log(req.body.email);
  registermodel.findByIdAndUpdate(
    { _id: req.body.id },
    {
      fname: req.body.fname,
      lname: req.body.lname,
      age: req.body.age,
      gender: req.body.gender,
      mobile: req.body.phone,
    },
    function (err, docs) {
      if (err) res.json(err);
      else {
        console.log(docs);
      }
    }
  );
});
///////////////////////////
router.post("/changepassword", (req, res) => {
  console.log(req.body.id);
  console.log(req.body.oldpassword);
  registermodel.findByIdAndUpdate(
    { _id: req.body.id },
    {
      password: req.body.newpassword,
    },
    function (err, docs) {
      if (err) res.json(err);
      else {
        console.log(docs);
      }
    }
  );
});
////////////////////////////

router.post("/addaddress", (req, res) => {
  console.log(req.body);
  let ins = new addressmodel({
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    user_id: req.body.userid,
  });
  ins.save((err) => {
    if (err) {
      console.log(err);
      res.send("Already Added");
    } else {
      res.send("ok");
    }
  });
});
//////////////////////////////////////////
router.post("/editaddress", (req, res) => {
  console.log(req.body.id);
  addressmodel.findByIdAndUpdate(
    { _id: req.body.id },
    {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    },
    function (err, docs) {
      if (err) res.json(err);
      else {
        console.log(docs);
      }
    }
  );
});
///////////////////////////////////////////
router.post("/deleteaddress", (req, res) => {
  console.log(req.body.id);
  addressmodel.findByIdAndRemove(
    { _id: req.body.id },

    function (err, docs) {
      if (err) res.json(err);
      else {
        console.log(docs);
        console.log("deleted");
      }
    }
  );
});

///////////////////////
router.get("/verify", (req, res) => {
  registermodel.find({}, (err, data) => {
    if (err) throw err;
    res.json({ data: data });
  });
});
///////////////////////////////////////////////
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  registermodel.findOne({ email: email, password: password }, (err, data) => {
    if (err) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else if (data == null) {
      res.json({ err: 1, msg: "Email or password is not correct" });
    } else {
      let payload = {
        uid: email,
      };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
      res.json({
        err: 0,
        msg: "Login Success",
        token: token,
        user: email,
      });
    }
  });
});
///////////////////////////////////////////////////////
router.post("/getdata", (req, res) => {
  let email = req.body.email;
  registermodel.findOne(
    { email: email, name, mobile, password },
    (err, data) => {
      if (err) {
        res.json({ err: 1, msg: "Email is not correct" });
      } else if (data == null) {
        res.json({ err: 1, msg: "Email not found" });
      } else {
        let payload = {
          uid: email,
        };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
        const user = req.body.email;
        res.json({ err: 0, msg: "Login Success", token: token, user: user });
      }
    }
  );
});

///////////////////////////////////////////////////////
router.post("/addpost", (req, res) => {
  let ins = new postmodel(req.body);
  console.log(ins);
  ins.save((err) => {
    if (err) {
      console.log(err);
      res.send("Already Added");
    } else {
      res.send("ok");
    }
  });
});

//////////////////////////////////////////

router.post("/addorder", (req, res) => {
  console.log(req.body.cart);
  let sofaname = [];
  for (let i = 0; i < req.body.cart.length; i++) {
    if (i !== req.body.cart.length - 1) {
      sofaname.push(req.body.cart[i].name + "\n");
    } else if (i == req.body.cart.length - 1) {
      sofaname.push(req.body.cart[i].name);
    }
  }

  let ins = new ordermodel({
    price: req.body.price,
    name: sofaname,
    card: req.body.card,
    user: req.body.user,
  });
  ins.save((err) => {
    if (err) {
      console.log(err);
      res.send("Already Added");
    } else {
      console.log(req.body, "komal");

      transporter.sendMail(
        {
          from: "kkv987654321@gmail.com",
          to: req.body.user,
          subject: "order Confirmation",
          // text: "Your order has been confirmed!! Thank you!!"
          html: `<h1>Your Order has been confirmed!!Thank you!!</h1>
          <table border='1'>
          <thead>
          <tr>
          <th>name</th>
          <th>Price</th>
          <th>Card</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>${sofaname}</td>
          <td>Rs.${req.body.price}</td>
          <td>${req.body.card}</td>
          </tr>
          </tbody>
          </table>`,
          attachments: [
            {
              // use URL as an attachment
              filename: "invo.pdf",
              path: "./invoices/invo.pdf",
            },
          ],
        },
        (error, res) => {
          if (error) {
            console.log(error);
          } else {
            console.log("mail sent", res);
          }
        }
      );
      res.send("ok");
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

router.get("/download", function (req, res) {
  const file = `./invoices/invo.pdf`;
  res.download(file);
});

///////////////////////
router.post("/invoice", (req, res) => {
  console.log(req.body.user);
  console.log(req.body.price);
  console.log(req.body.cart);
  console.log(req.body.card);
  let order = req.body;
  let sofaname = [];
  for (let i = 0; i < req.body.cart.length; i++) {
    if (i !== req.body.cart.length - 1) {
      sofaname.push(req.body.cart[i].name + "\n");
    } else if (i == req.body.cart.length - 1) {
      sofaname.push(req.body.cart[i].name);
    }
  }
  createInvoice(order, sofaname, "./invoices/invo.pdf");
});
///////////////////////////////////////

function createInvoice(order, sofaname, path) {
  let doc = new PDFDoc({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, order);
  generateInvoiceTable(doc, order);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}
//////////////////
function generateHeader(doc) {
  doc
    .fontSize(50)
    .text("NeoStore", 50, 45)
    .fillColor("#444444")

    .fontSize(10)
    .text("Hinjewadi ,Phase1", 200, 50, { align: "right" })

    .text("Pune,INDIA", 200, 80, { align: "right" })
    .moveDown();
}

function generateFooter(doc) {
  doc.fontSize(40).text("Thank you", 50, 780, { align: "center", width: 500 });
}

function generateCustomerInformation(doc, order, sofaname) {
  doc
    .fillColor("#444444")
    .font("Helvetica")
    .fontSize(20)
    .text("NeoStore-Bill", 50, 160);
  generateHr(doc, 185);
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(`Address: NeoStore-Phase1`, 50, 200)
    .font("Helvetica")
    .text(`User: ${order.user}`, 50, 215)

    .font("Helvetica-Bold")
    .text(`Price:${order.price}`, 300, 200)
    .font("Helvetica")
    .text(`Card:${order.card}`, 300, 215)
    .moveDown();
  generateHr(doc, 252);
}

function generateInvoiceTable(doc, order, sofaname) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(doc, invoiceTableTop, "Items");
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");
  for (i = 0; i < order.cart.length; i++) {
    const item = order.cart[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(doc, position, item.name);

    generateHr(doc, position + 20);
  }

  const totalPosition = invoiceTableTop + (i + 1) * 30;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    totalPosition,
    "",
    "",
    "Subtotal    ",
    "Rs.",
    order.price
  );
  const totalPosition2 = invoiceTableTop + (i + 1) * 40;
  generateTableRow(doc, totalPosition2, "", "", "GST(5%)", "Rs.", "5600");
  const totalPosition3 = invoiceTableTop + (i + 1) * 50;
  generateTableRow(
    doc,
    totalPosition3,
    "",
    "",
    "Total Price ",
    "Rs.",
    order.price + 5600
  );
}
function generateTableRow(doc, y, c1, c2, c3, c4, c5) {
  doc
    .fontSize(10)
    .text(c1, 50, y)
    .text(c2, 130, y, { width: 90, align: "right" })
    .text(c3, 250, y, { width: 90, align: "right" })
    .text(c4, 350, y, { width: 90, align: "right" })
    .text(c5, 450, y, { width: 90, align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

//////////////////////////////////////
///////////////////////////////////////
router.get("/getSocialUser", (req, res) => {
  let email = req.body.email;
  // console.log(email);
  registermodel.findOne({ email: email }, (err, data) => {
    // console.log(data);
    if (err) {
      throw err;
    }
    // console.log(data != null)
    if (data != null) {
      if (data.type == "remote") {
        res.send({ err: 1, msg: "Login Using Remote Credentials" });
      } else {
        let payload = { id: data._id };
        const token = jwt.sign(payload, jwtSecretKey, {
          expiresIn: 1000 * 60 * 60 * 24,
        });
        let responseData = {
          name: data.name,
          email: data.email,
          type: data.type,
          image: data.image,
        };
        res.send({ err: 0, responseData: responseData, token: token });
      }
    } else {
      res.send({ err: 1, msg: "Register First" });
    }
  });
});
///////////////////////////////////////
router.post("/getSearch", (req, res) => {
  const text = req.body.search;
  // console.log(text);
  productmodel
    .find({ product_name: { $regex: text, $options: "$i" } })
    .then((product) => {
      res.json(product);
    });
});

/////////////////////////////////////////////////////

router.post("/forgetService", (req, res) => {
  console.log(req.body);
  registermodel.findOne({ email: req.body.email }, (err, data) => {
    if (err) {
      throw err;
    } else {
      let otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      transporter.sendMail(
        {
          from: "kkv987654321@gmail.com",
          to: req.body.email,
          subject: "Password reset",

          html: `<h3>Your OTP :</h3>
          <h1>${otp}</h1>`,
        },
        (error, res) => {
          if (error) {
            console.log(error);
          } else {
            console.log("mail sent", res);
          }
        }
      );
      res.json({ err: 0, otp: otp });
      console.log(otp);
    }
  });
});

///////////////////////////
router.post("/resetpassService", (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  registermodel.findOneAndUpdate(
    { email: req.body.email },
    {
      password: req.body.password,
    },
    function (err, docs) {
      if (err) res.json(err);
      else {
        console.log(docs);
      }
    }
  );
});

/////////////////////////////////////

module.exports = router;
