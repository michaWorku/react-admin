import { FC } from 'react'
import { Navbar, Sidebar } from '../../components'
import './home.scss'

const Home : FC = () => {
  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar />
        home container
      </div>
    </div>
  )
}

export default Home