import { Component } from "react";
import NewsProfile from '../../context/NewsProfile';
import { CiBookmark } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { FaRegHeart,FaHeart,FaBookmark } from "react-icons/fa";
import './index.css'

class Card extends Component{
    render(){
        return (
            <NewsProfile.Consumer>
                {value => {
                    const {info} = this.props
                    const {updateLiked,addToSaved} = value
                    const updateLike = (value) => {
                        updateLiked(value)
                    }
                    return (
                        <>
                        <li className={`li bg${Math.floor(Math.random() * 10)}`}>
                            {/* Random background color is assigned to each list item*/}
                            <img src={info.urlToImage} className="success-img" alt="thumbnail"/>
                            <p className="success-head">{info.title}</p>
                            {/* Upon Clicking more you will be navigated to the original news page */}
                            <p>{info.description} <a href={info.url}>...more</a></p>
                            <div  className="card-foot">
                                <div className="card-sub">
                                    {/* like button when liked the card will be added to liked posts section */}
                                    <button className="like-button" onClick={() => updateLike(info)}>
                                        {info.liked ? <FaHeart color="red" size={20}/> : <FaRegHeart size={20}/> }
                                        <p className="like-text">Like</p>
                                    </button>
                                    <button className="like-button" onClick = {() => addToSaved(info)} >
                                        {/* Demo share button */}
                                        {<IoMdShare size={20}/> }
                                        <p className="like-text">Share</p>
                                    </button>
                                </div>
                                <button className="like-button" onClick={() => addToSaved(info)}>
                                    {/* Saved button when liked the card will be added to liked posts section */}
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
