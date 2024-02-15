import {Component} from 'react'

import Profile from './components/Profile'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import NewsProfile from './context/NewsProfile'
import {v4 as uuid} from 'uuid'
import './App.css'
import Home from './components/Home'
import Settings from './components/Settings'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class App extends  Component {
  state = {
    dark : false,
    wholeData : [],
    likedData : [{id : uuid(),
      author : "Mariella Moon",
      content : "Elon Musk has started moving his businesses away from Delaware, following a judge's decision in the state to invalidate his $56 billion Tesla pay package. In a post on X, Musk has announced that Spac… [+1993 chars]",
      description : "Elon Musk has started moving his businesses away from Delaware, following a judge's decision in the state to invalidate his $56 billion Tesla pay package. In a post on X, Musk has announced that SpaceX has moved its corporate home from Delaware to Texas, alon…",
      publishedAt : "2024-02-15T07:32:17Z",
      sourceId : "engadget",
      sourceName : "Engadget",
      title : "SpaceX moves its legal home to Texas from Delaware",
      url : "https://www.engadget.com/spacex-moves-its-legal-home-to-texas-from-delaware-073217793.html",
      urlToImage : "https://s.yimg.com/ny/api/res/1.2/8OkWU0YcDLdPe3Htem1Ndg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDE-/https://s.yimg.com/os/creatr-uploaded-images/2024-02/1ffe91b0-cbcf-11ee-a577-5ff7ea601f95",
      liked : true,
      saved : false, }],
    savedData : [{id : uuid(),
      author : "Ben Glickman",
      content : "New York City is suing a slate of social-media companies, alleging that they are causing a youth mental-health crisis.\r\nMayor Eric Adams announced Wednesday that the suit against Meta Platforms, YouT… [+641 chars]",
      description : "Mayor says suit against Meta, Snap and others was looking to force companies to change their practices",
      publishedAt : "2024-02-14T23:09:21Z",
      sourceId : "the-wall-street-journal",
      sourceName : "The Wall Street Journal",
      title : "NYC Sues Social-Media Companies for Youth Mental-Health Effects",
      url : "https://www.wsj.com/us-news/nyc-files-suit-against-social-media-companies-for-youth-mental-health-effects-67c180dc",
      urlToImage : "https://images.wsj.net/im-925598/social",
      liked : false,
      saved : true,
      }]
  }

  changeTheme = () => {
    this.setState(prevState => ({dark : !prevState.dark}))
  }

  updateLiked = (value) => {
    // toast("Hello Geeks 6", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    // });
    const {likedData} = this.state
    const newArticle = {...value , liked : true}
    this.setState(prevState => ({likedData : [...prevState.likedData,newArticle]}))
  }

  addToSaved = (value) => {
    const {savedData} = this.state
    const  newArticle = {...value , saved : true}
    this.setState(prevState => ({savedData : [...prevState.savedData,newArticle]}))
  }

  updateData = (value) => {
    console.log("value",value)
  }


  render(){
    const {dark,likedData,savedData,wholeData} = this.state
    return (
      <NewsProfile.Provider value={{
        dark:dark, 
        changeTheme : this.changeTheme ,
        likedData : likedData,
        updateLiked : this.updateLiked,
        savedData:savedData,
        addToSaved : this.addToSaved,
        wholeData: [],
        updateData : this.updateData,
      }}>

        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/profile" element={<Profile/>} exact />
        <Route path="/settings" element={<Settings/>} exact />
        </Routes>
        </BrowserRouter>
      </NewsProfile.Provider >
    )
  }
}

export default App