import { Component } from "react";
import NewsProfile from "../../context/NewsProfile";
import { CiBookmark } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { FaRegHeart,FaHeart,FaBookmark } from "react-icons/fa";
import './index.css'

class Card extends Component{
    render(){
        return (
            <NewsProfile.Consumer>
                {value => {
                    const {info,like} = this.props
                    const {updateLiked,addToSaved} = value
                    const updateLike = (value) => {
                        updateLiked(value)
                    }
                    return (
                        <>
                        <li className={`li bg${Math.floor(Math.random() * 10)}`}>
                            <img src={info.urlToImage} className="success-img"/>
                            <p className="success-head">{info.title}</p>
                            <p>{info.description} <a href={info.url}>...more</a></p>
                            <div  className="card-foot">
                                <div className="card-sub">
                                    <button className="like-button" onClick={() => updateLike(info)}>
                                        {info.liked ? <FaHeart color="red" size={20}/> : <FaRegHeart size={20}/> }
                                        <p className="like-text">Like</p>
                                    </button>
                                    <button className="like-button" onClick = {() => addToSaved(info)} >
                                        {<IoMdShare size={20}/> }
                                        <p className="like-text">Share</p>
                                    </button>
                                </div>
                                <button className="like-button" onClick={() => addToSaved(info)}>
                                    {info.saved? <FaBookmark color="blue" size={20}/> : <CiBookmark size={20}/> }
                                    <p className="like-text">Save</p>
                                </button>
                            </div>
                        </li>
                        </>
                    )
                }}
            </NewsProfile.Consumer>
        )


    
        
    }
}

export default Card