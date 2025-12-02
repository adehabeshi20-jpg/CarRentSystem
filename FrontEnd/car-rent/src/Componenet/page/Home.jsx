
import Navbar from './Navbar'
import homelogo from '../../assets/Image/Tesla.jpg'
import Carspage from '../Carspage'
import Cars from '../Cars'
import Footer from '../Footer'
import Payment from '../Payment'

const Home = () => {
  return (
    <div className=''>
        <div className="relative">
          <img src={homelogo} alt="homelogo" className="w-full h-[100vh] object-cover" />
          <h1 className="absolute inset-0 flex items-end mb-15 justify-center text-white font-bold text-4xl bg-black/50">
            Welcome to Ade Car Rent
          </h1>
        </div>
      


    </div>
    

  )
}

export default Home


