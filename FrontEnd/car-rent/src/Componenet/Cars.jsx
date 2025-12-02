import React, { useState } from "react";
import axios from "axios";
import tesla from "../assets/Image/Tesla.jpg";

const Cars = () => {
  const [values, setValues] = useState({
    car_name: "",
    model: "",
    brand: "",
    year: "",
    rent_price: "",
    available: true,
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "available") {
      setValues({ ...values, [name]: value === "true" });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const handleRentChange = (e) => {
    let val = e.target.value.replace(/,/g, "");
    if (!/^\d*\.?\d*$/.test(val)) return;
    setValues({ ...values, rent_price: val });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    try {
      const res = await axios.post("http://localhost:2530/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Car added successfully!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error adding car");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${tesla})` }}
    >
      <div className="bg-black/40 p-8 rounded-lg w-full max-w-4xl text-white backdrop-blur-sm">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Car</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4 text-white"
        >
          {/* Car Name with dropdown + input */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Car Name</label>
            <select
              value={values.car_name}
              onChange={handleChange}
              name="car_name"
              className="p-2 rounded text-red-900 bg-cyan-300 mb-1"
            >
              <option value="">Select Car</option>
              <option value="Camry">Camry</option>
              <option value="Tesla">Tesla</option>
              <option value="Jeep">Jeep</option>
              <option value="Ford">Ford</option>
              <option value="V8Platinum">V8 Platinum</option>
            </select>
            <input
              type="text"
              name="car_name"
              value={values.car_name}
              onChange={handleChange}
              placeholder="Or Enter a custom car name"
              className="p-2 rounded text-red-900 bg-cyan-300"
            />
          </div>

          {/* Model with dropdown + input */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Model</label>
            <select
              value={values.model}
              onChange={handleChange}
              name="model"
              className="p-2 rounded text-red-900 bg-cyan-300 mb-1"
            >
              <option value="">Select Model</option>
              <option value="Camry-2023">Camry 2023</option>
              <option value="Tesla-ModelS">Tesla Model S</option>
              <option value="Jeep-Wrangler">Jeep Wrangler</option>
              <option value="Ford-F150">Ford F150</option>
              <option value="V8Platinum-Edition">V8 Platinum Edition</option>
            </select>
            <input
              type="text"
              name="model"
              value={values.model}
              onChange={handleChange}
              placeholder="Or Enter a custom model"
              className="p-2 rounded text-red-900 bg-cyan-300"
            />
          </div>

          {/* Brand with dropdown + input */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Brand</label>
            <select
              value={values.brand}
              onChange={handleChange}
              name="brand"
              className="p-2 rounded text-red-900 bg-cyan-300 mb-1"
            >
              <option value="">Select Brand</option>
              <option value="Toyota">Toyota</option>
              <option value="Tesla">Tesla</option>
              <option value="Jeep">Jeep</option>
              <option value="Ford">Ford</option>
              <option value="V8Platinum">V8 Platinum</option>
            </select>
            <input
              type="text"
              name="brand"
              value={values.brand}
              onChange={handleChange}
              placeholder="Or Enter a custom brand"
              className="p-2 rounded text-red-900 bg-cyan-300"
            />
          </div>

          {/* Year, Rent, Availability, File input, Submit button */}
          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Year</label>
            <input
              type="number"
              name="year"
              value={values.year}
              onChange={handleChange}
              placeholder="Enter Year"
              min="1990"
              max={new Date().getFullYear()}
              className="p-2 rounded text-red-900 bg-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Rent Price</label>
            <input
              type="text"
              name="rent_price"
              value={values.rent_price}
              onChange={handleRentChange}
              placeholder="Enter Rent Price"
              className="p-2 rounded text-red-900 bg-cyan-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 font-semibold">Availability</label>
            <select
              name="available"
              value={values.available}
              onChange={handleChange}
              className="p-2 rounded text-red-900 bg-cyan-300"
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>

          <div className="flex flex-col col-span-2">
            <label className="mb-1 font-semibold">Car Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 rounded text-red-900 bg-cyan-100"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400 to-blue-500
                        hover:from-pink-500 hover:to-yellow-500 py-2 rounded font-bold transition-all duration-300"
            >
              Add Car
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cars;
