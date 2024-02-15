import {Component}  from 'react'
import {Link} from 'react-router-dom'
import { MdDarkMode,MdLightMode } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import './index.css'
import NewsProfile from '../../context/NewsProfile.js';

class Pheader extends Component{
    render(){
        return (
            <NewsProfile.Consumer>
                {value => {
                    const {dark,changeTheme} = value
                    return(
                    <nav className={`header-main ${dark ? "dark" : "dark-border"}`}>
                    <Link to="/">
                        <img className="header-image" src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/ssevs5wenm0q3bxublpc"/>
                    </Link>
                    <div>
                        <button className="no-style-button" type="button"  onClick = {() => changeTheme()}>
                            {dark ? <MdLightMode size={30} color="white"/> : <MdDarkMode size={30} />}
                        </button>
                        <Link to="/settings">
                            <button className='no-style-button'>
                                {dark ? <IoMdSettings size={30} color="white"/> : <IoMdSettings size={30}/>}
                            </button>
                        </Link>
                    </div>
                </nav>)
                }}
            </NewsProfile.Consumer>


            
        )
    }
}

export default Pheader