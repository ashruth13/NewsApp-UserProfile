import {Component} from 'react'
import Pheader from '../Pheader'
import Footer from '../Footer'
import { FaUserEdit,FaAngleRight } from "react-icons/fa";
import { MdInfo,MdDelete } from "react-icons/md";
import { IoMdContacts,IoMdNotifications } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import './index.css'
import NewsProfiles from '../../context/NewsProfile';

class Settings extends Component{
    render(){
        return (
            <NewsProfiles.Consumer>
                {value => {
                    const {dark} = value
                    return (<div>
                        <Pheader />
                        <div className={`settings-main ${dark ? "settings-dark" : ""} `}>
                            <p className='settings-head'>Settings</p>
                            <ul className='settings-ul'>
                                <hr />
                                <li className='settings-li'>
                                    <div className='sub-li'>
                                <FaUserEdit size={30}/>
                                <p className="li-para">Edit Profile</p>
                                </div>
                                <FaAngleRight size={30}/>
                                </li>
        
                                <hr />
                                <li className='settings-li'>
                                    <div className='sub-li'>
                                <IoMdContacts size={30}/>
                                <p className="li-para">Sync Contancts</p>
                                </div>
                                <FaAngleRight size={30}/>
                                </li>
                                
                                <hr />
                                <li className='settings-li'>
                                    <div className='sub-li'>
                                <IoMdNotifications size={30}/>
                                <p className="li-para">Notifications</p>
                                </div>
                                <FaAngleRight size={30}/>
                                </li>
                                <hr />
                                <li className='settings-li'>
                                    <div className='sub-li'>
                                <MdDelete size={30}/>
                                <p className="li-para">Delete Profile</p>
                                </div>
                                <FaAngleRight size={30}/>
                                </li>
                                <hr />
                                <li className='settings-li'>
                                    <div className='sub-li'>
                                <MdInfo size={30}/>
                                <p className="li-para">App Info</p>
                                </div>
                                <FaAngleRight size={30}/>
                                </li>
                                <hr />
                                <li className='settings-li'>
                                    <div className='sub-li'>
                                <IoLogOut size={30}/>
                                <p className="li-para">Logout</p>
                                </div>
                                <FaAngleRight size={30}/>
                                </li>
                            </ul>
                        </div>
                        <Footer />
                    </div>)
                }}
            </NewsProfiles.Consumer>

            
        )
    }
}
export default  Settings