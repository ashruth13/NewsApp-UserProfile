import {Component} from 'react';
import Pheader from '../Pheader'
import Footer from '../Footer'
import { IoBookmarkOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlinePostAdd } from "react-icons/md";
import {v4 as uuid} from 'uuid'
import {ColorRing} from 'react-loader-spinner'
import NewsProfile from '../../context/NewsProfile';
import './index.css'
import Card from '../Card';

const apiConst = {
    initial : 'INITIAL',
    loading : 'LOADING',
    success : 'SUCCESS',
    failure : 'FAILURE'
}

class Profile extends Component{
    state = {
        activeTab : 'POSTS',
        data : '',
        status : apiConst.initial,
    }

    componentDidMount(){
        this.getNews()
    }

    getNews = async() => {
        this.setState({status : apiConst.loading})
        const url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch'
        const options = {
            headers: {
                Authorization: `9f640e2ac2154d97ad27b12d45b6fa5c`,
              },
            method : 'GET',
        }
        // News API call
        const response = await fetch(url,options)
        if (response.ok){
            const data = await response.json()
            // id, liked : false and saved : false are added to the data fetched from NEWSAPI
            const newData = data.articles.map(each => ({
                id : uuid(),
                author : each.author,
                content : each.content,
                description : each.description,
                publishedAt : each.publishedAt,
                sourceId : each.source.id,
                sourceName : each.source.name,
                title : each.title,
                url : each.url,
                urlToImage : each.urlToImage,
                liked : false,
                saved : false,
            }))
            this.setState({data : newData ,status : apiConst.success})
        }
        else{
            this.setState({status : apiConst.failure})
        }
    }

    userDetails = {
        // Demo user details
        name: "John Joseph",
        shortBio : "Navigating the news landscape with a curiosity for diverse stories and a passion for unbiased information. 📰✨ #NewsExplorer #InformedCitizen",
        avatarUrl : "https://res.cloudinary.com/dgw2vopar/image/upload/f_auto,q_auto/ynd9czngp4p3rqe8vq7x"
    }

    posts = () => {
        // To change activeTab to Posts so that they can be viewed upon clicking tha icon
        this.setState({activeTab:'POSTS'})
    }

    liked = () => {
        // To change activeTab to Liked so that they can be viewed upon clicking tha icon
        this.setState({activeTab:'LIKED'})
    }

    saved = () => {
        // To change activeTab to Saved so that they can be viewed upon clicking tha icon
        this.setState({activeTab:'SAVED'})
    }


    render(){
        return (
            <NewsProfile.Consumer>
                {value => {
                    const {activeTab} = this.state
                    const {dark,savedData,likedData} = value
                    const renderSaved = () => {
                        // User Bookmarked/ saved posts
                        return (
                            <div className='post-main'>
                                <p className='post-head'>Saved Posts</p> 
                                <div className={`profile-success ${dark ? 'success-dark' : ''}`}>
                                    <ul className="ul">
                                        {savedData.map(each => 
                                        <Card info={each} />
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    const renderLiked = () => {
                        // Liked Post view section
                        return (
                            <div className='post-main'>
                                <p className='post-head'>Liked Posts</p> 
                                <div className={`profile-success ${dark ? 'success-dark' : ''}`}>
                                    <ul className="ul">
                                        {likedData.map(each => 
                                            <Card info={each} />
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )
                    }

                    const renderPosts = () => {
                        // Posts posted by User
                        const {data} = this.state
                        return (
                            <div className='post-main'>
                                <p className='post-head'>Your Posts</p> 
                                <div className={`profile-success ${dark ? 'success-dark' : ''}`}>
                                    <ul className="ul">
                                        {data.map(each => 
                                            <Card info={each} />
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )
                    }

                    
                    // To show Loader to user  while fetching the data
                    const renderLoader = () => (
                        <div className={`loader ${dark ? "loader-dark" : ""}`}>
                            <ColorRing color="#621708"/>
                        </div>
                    )

                    const renderData = () => {
                        //  To move between Tabs 
                        switch (activeTab) {
                            case 'POSTS':
                                return renderPosts()
                            case "SAVED":
                                return renderSaved()
                            case "LIKED":
                                 return renderLiked()
                            default:
                                return ""
                        }
                    }

                    const handleClickRetry = () => {
                        //  To try again to fetch News when failed 
                        this.getNews()
                    }

                    const renderFailure = () => {
                        <div className={`loader ${dark ? "loader-dark" : ""}`}>
                            <h1>Failed</h1>
                            <p>Please try again</p>
                            <button className="no-style-button" onClick={handleClickRetry}>Try Again</button>
                        </div>
                    }

                    const renderSuccess = () => (
                        // Upon successfully fetching the data
                        <div className={`profile-main ${dark ? "success-dark" : ''}`}>
                            <div className="profile-user">
                                <img className='profile-image' alt="user-profile" src={this.userDetails.avatarUrl} />
                                <div className="profile-details">
                                    <p className='profile-name'>{this.userDetails.name}</p>
                                    <p className='profile-bio'>{this.userDetails.shortBio}</p>
                                </div>
                            </div>
                            <hr/>
                            <div className='icons'>
                                <button onClick={this.posts} className={`no-profile-button ${dark && activeTab==='POSTS' ? "border-white" : ''} ${activeTab==="POSTS" ? 'active' : ''}`}>
                                    <MdOutlinePostAdd size={35} color={`${dark ? "white" : ''}`}/>
                                </button>
                                <button onClick={this.liked} className={`no-profile-button ${dark && activeTab==='LIKED' ? "border-white" : 'ko'} ${activeTab==="LIKED" ? 'active' : ''}`}>
                                    <AiOutlineLike size={35} color={`${dark ? "white" : ''}`}/>
                                </button>
                                <button onClick={this.saved} className={`no-profile-button ${dark && activeTab==='SAVED' ? "border-white" : 'ko'} ${activeTab==="SAVED" ? 'active' : ''}`}>
                                    <IoBookmarkOutline size={35} color={`${dark ? "white" : ''}`}/>
                                </button>
                            </div>
                            <div>
                                {renderData()}
                            </div>
                        </div>
                    )

                    const renderDecide = () => {
                        // To display Loader, Failed and Success view depending on fetching
                        const {status} = this.state
                        switch (status) {
                            case apiConst.loading:
                                return renderLoader()
                            case apiConst.success:
                                return renderSuccess()
                            case apiConst.failure:
                                return renderFailure()
                            default:
                                return ''
                        }
                    }

                    return (
                        <div>
                            <Pheader/>
                            <div>
                                {renderDecide()}
                            </div>
                            <Footer />
                        </div>
                    )
                }}
            </NewsProfile.Consumer>
        )
    }
}

export default Profile