import React, { useState, useEffect } from "react";
import primumcar from "../assets/Image/Tesla Cybertruck2021 .jpg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump, faRoad, faChair } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Carspage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:2530/cars")
      .then((res) => {
        setCars(res.data.cars);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

    
  const handleBook = (carId) => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      navigate("/login", { state: { redirectTo: `/user/Booking/${carId}` } });
    } else {
      navigate(`/user/Booking/${carId}`);
    }
  };
if (loading) return <p className="text-center mt-10">Loading cars...</p>;

  return (
    <div className="w-full min-h-screen  bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600">
      <img
        src={primumcar}
        alt="Premium Car"
        className="w-full h-[50vh] object-cover opacity-70"
      />

      <div className="bg-black/40 p-8 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Premium Car Collection
        </h1>
        <p className="text-lg text-white mb-10 max-w-2xl text-center">
          Discover our exclusive fleet of luxury vehicles. Each car is meticulously
          maintained and ready for your journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {cars.map((car) => (
            <div
              key={car.id}
              className="border rounded-lg shadow-lg overflow-hidden bg-white transform hover:scale-105 transition-all"
            >
              <img
                src={`http://localhost:2530/cars/${car.image_url}`}
                alt={car.car_name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4 text-center space-y-2">
                <p className="text-2xl font-bold text-blue-500">{car.car_name}</p>
                <p className="text-gray-700">{car.year}</p>

                <div className="flex justify-between text-sm text-gray-600 mt-3">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faGasPump} />
                    <span>Petrol</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faRoad} />
                    <span>15 km/l</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faChair} />
                    <span>4 Seats</span>
                  </div>
                </div>
              </div>

              <button onClick={() => handleBook(car.id)}
                type="button"
                className="w-full mb-4 bg-gradient-to-r from-green-400 to-blue-500 
                            hover:from-pink-500 hover:to-yellow-500 py-2 text-white 
                            font-bold rounded transition-all duration-300">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carspage;
