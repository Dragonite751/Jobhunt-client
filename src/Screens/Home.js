import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import WelcomeMessage from '../Components/Welcome'
import AcademicPrograms from '../Components/AcademicPrograms'
import PlacementStatistics from '../Components/Statistics'
// PlacementStatisticsa
// AcademicPrograms
// WelcomeMessage
// Navbar
const Home = () => {
  return (

    <div className='bg-custom-blue'>
    <Navbar/>
    <WelcomeMessage/>
    <AcademicPrograms/>
    <PlacementStatistics/>
    <Footer/>
    </div>
  )
}

export default Home