import React from 'react'
import { useNavigate } from 'react-router-dom'
import Getdata from './Getdata';
import Getdatabookin from './Getdatabookin';

const Homeboard = ({ onLogout }) => {
  const navigate=useNavigate();
  return (
     <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mt-20 text-center items-center">Dashboard</h1>

        <button
          className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer"
          onClick={() => navigate('/owner')}>Admin</button>
          <button
          className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer mt-20"
          onClick={() => navigate('/')}>HOME</button>
          <button
          className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer mt-20"
          onClick={() => navigate('/Hotel')}>  BOOKING</button>
          <button
          className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer mt-20"
          onClick={() => navigate('/Experience')}>  Expriance</button>
          <button
          className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer mt-20"
          onClick={() => navigate('/About')}>  About</button>
          

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <Getdatabookin/>
    </div>
  )
}

export default Homeboard