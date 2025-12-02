import bcrypt from "bcrypt";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import admin_router from "./Auth/admin_auth.js";
import router from "./Auth/user_auth.js";
import dbconn from "./Database/Db.js";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
console.log(process.env.PORT)
const app=express();
app.use(cors({
origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use("/admin",admin_router)
app.use("/users",router);
app.use('/cars', express.static(path.join(__dirname, 'cars')));
app.use('/cars', express.static(path.join(__dirname, 'uploads')));
app.use("/images", express.static(path.join(path.resolve(), "uploads")));


const SECRET=" ADE car rent secret "

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });



app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:2530"], 
      imgSrc: ["'self'", "data:"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));

const hashPassword = async () => {
  const hashed = await bcrypt.hash("abuahmed11", 10);
  console.log(hashed); 
};

hashPassword();

const JWT_SECRET = "ADE car rent secret";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Token missing or malformed" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(403).json({ error: "Invalid token" });
  }
};

app.get("/db_status",(req,res)=>{
  dbconn.ping((err)=>{
    if(err){
    res.status(500).send("Database Conncetion  Failed")
  }else{
    res.status(200).send(`Database connceted to ${process.env.DB_NAME} successfully!`)
  }
  })
  })
app.post("/cars", upload.single("image"),async(req,res)=>{
  const {car_name,model,brand ,year,rent_price,available}=req.body
  const image_url = req.file ? req.file.filename : null;
  const sql =`INSERT INTO cars(car_name,model,brand ,year,rent_price,available,image_url) VALUES(?,?,?,?,?,?,?)`;
  dbconn.query(sql,[car_name,model,brand ,year,rent_price,available,image_url],(err,result)=>{
    if(err){
      res.status(500).json({errro:err.message});
      console.log(err);
    }
    else{
      res.status(200).json({message:"Car Table added successfully", id: result.insertId });
      console.log("Car Table added successfully");
    }
  })
})
app.post("/booking", async (req, res) => {
  const { user_id, car_id, start_date, end_date, status} = req.body;

  const sql = `INSERT INTO booking (user_id, car_id,start_date,end_date,status)
                VALUES (?, ?, ?, ?, ?)`;

  dbconn.query(sql, [user_id, car_id, start_date, end_date, status], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Payment added successfully", id: result.insertId });

  });
});

app.post("/payments",async(req,res)=>{
  const {booking_id ,amount ,payment_method ,status}=req.body
  const paid_at = status === "paid" ? new Date() : null;
  const sql =`INSERT INTO payments  (booking_id ,amount ,payment_method ,status,paid_at) VALUES(?,?,?,?,?)`;
  dbconn.query(sql,[booking_id ,amount ,payment_method ,status,paid_at],(err,result)=>{
      console.log(req.body);  
    if(err){
      res.status(500).json({error:err.message});
      console.log(err);
    }
    else{
      res.status(200).json({message:"payments Table added successfully", id: result.insertId });
      console.log("payments   Table added successfully");
    }
  });
});
app.get("/bookingStatus",(req,res)=>{
const sql = ` SELECT id, start_date, end_date, status 
              FROM booking 
              WHERE status NOT IN ('completed','cancelled')`;
  dbconn.query(sql,(err,result)=>{
  if(err)
  return res.status(500).json({error:err.message})
res.json(result)
});
})
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";

  dbconn.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      message: "User data provided successfully",
      users: results
    });
  });
});
app.get("/admin",(req,res)=>{
  const sql=`SELECT * FROM admins `
  dbconn.query(sql,(err,result)=>{
    if(err){
      return  res.status(500).json({error:err.message}); 
    }else{
      res.status(200).json({message:"Admin data provided successfully",
        admins:result
      })
    }
  })

})
app.get("/cars",(req,res)=>{
  const sql=` SELECT * FROM cars`
  dbconn.query(sql,(err,result)=>{
    if(err){
      res.status(500).json({error:err.message})
    }
    res.status(200).json({message:"cars data provided successfully",
      cars:result
    })
    
  })
})
app.get("/booking", (req, res) => {
  const sql = `SELECT * FROM booking`;
  dbconn.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      message: "Booking data provided successfully",
      booking: result 
    });
  });
});

app.get("/payment",(req,res)=>{
  const sql =`SELECT * FROM payments`
  dbconn.query(sql,(err,result)=>{
    if(err){
      res.status(500).json({error:err.message})
    }
    res.status(200).json({message:"payment data provided successfully",
      payments:result
    })
  })
})
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ?`;

  dbconn.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User data provided successfully",
      user: result[0],
    });
  });
});
app.get("/booking/user/:id", (req, res) => {
  const userId = req.params.id;
  const sql = `
    SELECT 
      b.id,
      b.start_date,
      b.end_date,          -- fixed
      b.status,
      c.car_name AS carName,
      c.image_url AS url
    FROM booking b
    LEFT JOIN cars c ON b.car_id = c.id
    WHERE b.user_id = ?
    ORDER BY b.start_date DESC
  `;
  dbconn.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ bookings: results });
  });
});




app.get("/booking/:id", (req, res) => {
  const booking_id = req.params.id;

  const sql = `SELECT * FROM booking WHERE id = ?`;

  dbconn.query(sql, [booking_id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ booking: results[0] || null });
  });
});


app.get("/fullinfobooking", (req, res) => {
  const sql = `SELECT booking.*, users.*, cars.* 
    FROM booking JOIN users ON booking.user_id = users.id
    JOIN cars ON booking.car_id = cars.id `;
  dbconn.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({
      message: "Booking data provided successfully",
      bookings: result
    });
  });
});

app.get("/fullinfobooking/:id", (req, res) => {
  const id = req.params.id;
 const sql = `
    SELECT booking.*, users.*, cars.* 
    FROM booking
    JOIN users ON booking.user_id = users.id
    JOIN cars ON booking.car_id = cars.id
    WHERE booking.id = ?
  `;
  dbconn.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({
      message: "Booking data provided successfully",
      booking: result[0]
    });
  });
});
app.get("/Cars_id/:id",(req,res)=>{
  const id= req.params.id;
  const sql=` SELECT * FROM cars WHERE id = ? `;
  dbconn.query(sql,[id],(err,result)=>{
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "cars not found" });

    res.status(200).json({
      message: "cars data provided successfully",
      booking: result[0]
    });
  });
});
app.put("/userupdate/:id", (req, res) => {
  const { id } = req.params;
  const { Fname, Lname, email, password, phone } = req.body;
  const sql = "UPDATE users SET Fname=?, Lname=?, email=?, password=?, phone=? WHERE id=?";
  dbconn.query(sql, [Fname, Lname, email, password, phone, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "User updated successfully" });
  });
})

app.put("/updatebookingal/:id", (req, res) => {
  const id = req.params.id;
  const { start_date, end_date, status } = req.body;

  if (!start_date || !end_date || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const selectSql = `SELECT * FROM booking WHERE id = ?`;
  dbconn.query(selectSql, [id], (err, booking) => {
    if (err) return res.status(500).json({ error: err.message });
    if (booking.length === 0) return res.status(404).json({ message: "Booking not found" });

    const updateSql = `UPDATE booking SET start_date = ?, end_date = ?, status = ? WHERE id = ?`;
    dbconn.query(updateSql, [start_date, end_date, status, id], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      dbconn.query(selectSql, [id], (err3, updatedBooking) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.status(200).json({
          message: "Booking updated successfully",
          booking: updatedBooking[0],
        });
      });
    });
  });
});


app.delete("/deletebooking/:id", (req, res) => {
  const id = req.params.id;

  const selectSql = `SELECT * FROM booking WHERE id = ?`;
  dbconn.query(selectSql, [id], (error, fetchedBooking) => {
    if (error) return res.status(500).json({ message: "Error fetching booking", error: error.message });
    if (fetchedBooking.length === 0) return res.status(404).json({ message: "Booking not found" });

    const deleteSql = `DELETE FROM booking WHERE id = ?`;
    dbconn.query(deleteSql, [id], (err, result) => {
      if (err) return res.status(500).json({ message: "Error deleting booking", error: err.message });

      res.status(200).json({
        message: "Booking deleted successfully",
        deletedBooking: fetchedBooking[0] 
      });
    });
  });
});

app.delete("/booking/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM booking WHERE id = ?";
  dbconn.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Booking deleted successfully" });
  });
});
app.get("/payment/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM payments WHERE user_id = ?";
  dbconn.query(sql, [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ payments: rows });
  });
});

app.get("/payment/user/:id", (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT 
      p.id AS payment_id,
      p.booking_id,
      p.amount,
      p.payment_method,
      p.status AS payment_status,

      b.carName,
      b.start_date,
      b.end_date,
      b.status AS booking_status,
      b.url
    FROM payments p
    INNER JOIN bookings b ON p.booking_id = b.id
    WHERE b.user_id = ?;
  `;

  dbconn.query(sql, [userId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ payments: rows });
  });
});



app.listen(process.env.PORT,()=>{
console.log(`Server running at Port ${process.env.PORT}`);
})