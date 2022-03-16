import { FC } from 'react'
import { Navbar, Sidebar, Widget } from '../../components'
import './home.scss'

const Home : FC = () => {
  return (
    <div className='home'>
      <Sidebar/>
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget widgetType='user'/>
          <Widget widgetType='order'/>
          <Widget widgetType='earning'/>
          <Widget widgetType='balance'/>
        </div>
      </div>
    </div>
  )
}

export default Home