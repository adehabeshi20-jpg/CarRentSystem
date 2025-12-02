import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();
const dbconn= mysql.createConnection({
host: process.env.DB_HOST,
user:process.env.DB_USER,
password:process.env.DB_PASSWORD,
database:process.env.DB_NAME,
port: process.env.DB_PORT || 5510,
})
  dbconn.connect((err)=>{
    if(err){
      console.error("Database Conncetion  Failed", err)
    }else{
      console.log(`Database connceted to ${process.env.DB_NAME} successfully!`);
    }
  })
dbconn.connect((err)=>{
if (err)throw err;
console.log("mysql database is conncected Successfully");
dbconn.query(`
CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      Fname VARCHAR(100) NOT NULL,
      Lname VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) throw err;  }
  )
  dbconn.query(`
  CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      Fname VARCHAR(50) NOT NULL,
      Lname VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(15) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) throw err;  }
  );
    dbconn.query(`
    CREATE TABLE IF NOT EXISTS cars (
      id INT AUTO_INCREMENT PRIMARY KEY,
      car_name VARCHAR(100) NOT NULL,
      model VARCHAR(50),
      brand VARCHAR(50),
      year INT,
      rent_price DECIMAL(10,2),
      available BOOLEAN DEFAULT TRUE,
      image_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => { 
      if (err) throw err;  }
  );
  dbconn.query(`    
  CREATE TABLE IF NOT EXISTS booking (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      car_id INT NOT NULL,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL,
      status ENUM('booked','completed','cancelled') DEFAULT 'booked',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (car_id) REFERENCES cars(id)
    )`,
    (err) => { 
      if (err) throw err; 
      
    });

    dbconn.query(`
    CREATE TABLE IF NOT EXISTS payments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      booking_id INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      payment_method ENUM('cash','card','bank') DEFAULT 'cash',
      status ENUM('pending','paid','failed') DEFAULT 'pending',
      paid_at TIMESTAMP NULL,
      FOREIGN KEY (booking_id) REFERENCES booking(id)
    )`, err => { 
      if (err) throw err; 
      console.log("All table created "); });

})


  
  export default dbconn;