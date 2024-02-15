import { Component } from "react";
import { MdOutlineHome,MdHome } from "react-icons/md";
import './index.css'
import {Link} from 'react-router-dom'
import NewsProfile from "../../context/NewsProfile";

class Footer extends  Component {
    render(){
        return (
            <NewsProfile.Consumer>
                {value => {
                    const {dark} = value
                    return (<div className={`footer-main ${dark ? "dark" : "dark-border-top" }`}>
                        <Link to="/">
                        <button className="no-style-button">{dark ? <MdHome size={50} color="white"/> : <MdOutlineHome size={50} color="black"/> }
                        </button>
                        </Link>
                        <Link to="/profile">
                        <button className="no-style-button">
                            <img className="footer-avatar" src="https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/ynd9czngp4p3rqe8vq7x" />
                        </button>
                        </Link>
                    </div>)
                }}
            </NewsProfile.Consumer>
        
        )
    }
}

export default Footer