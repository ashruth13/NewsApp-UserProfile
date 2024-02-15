import { Component } from "react";
import './index.css'
import Header from "../Header";
import Footer from '../Footer';
import Card from '../Card'
import { Link } from "react-router-dom";
import {ColorRing} from 'react-loader-spinner'
import NewsProfile from "../../context/NewsProfile";
import {v4 as uuid} from 'uuid'

const apiConst = {
    initial : 'INITIAL',
    loading : 'LOADING',
    success : 'SUCCESS',
    failure : 'FAILURE'
}

class Home extends  Component {
    state = {
        status : apiConst.initial,
        data : '',
    }

    componentDidMount(){
        this.getDetails()
    }

    getDetails = async() => {
        this.setState({status : apiConst.loading})
        const url = 'https://newsapi.org/v2/top-headlines?country=us&category=business'
        const options = {
            headers: {
                Authorization: `9f640e2ac2154d97ad27b12d45b6fa5c`,
              },
            method : 'GET',
        }
        const response = await fetch(url,options)
        if (response.ok){
            const data = await response.json()
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
            this.setState({data : newData,status : apiConst.success})
        }

        else{
            this.setState({status : apiConst.failure})
        }
    }

    

    render(){
        return <NewsProfile.Consumer>
            {value => {
                const {data} = this.state
                const {dark,updateLiked,addToSaved,updateData} = value
                const renderLoader = () => (
                    <div className={`loader ${dark ? "loader-dark" : ""}`}>
                    <ColorRing color="#621708"/>
                    </div>
                )
                updateData(data)
                // const like = (value) => {
                //     const data = JSON.parse(localStorage.getItem("wholeData"))
                //     const newData = data.map(each => {
                //         if (each.id===value){
                //             return {...each,liked :true}
                //         }
                //         return each
                //     })
                //     console.log(newData)
                //     localStorage.setItem("wholeData" , JSON.stringify(newData))
                // }
                const decide = () => {
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
                const renderFailure = () => {}
                const renderSuccess = () => {
                    return (
                    <div className={`success ${dark ? 'success-dark' : ''}`}>
                        <h1 className="success-heading">Top headlines</h1>
                        <ul className="ul">
                            {data.map(each => 
                                <Card info={each}/>        
                            )}
                        </ul>
                    </div>
                    )
                }
                return (
                    <div>
                        <Header />
                        <div className="home-main">
                            {decide()}
                        </div>
                        <Footer />
                    </div>
                )
            }}
        </NewsProfile.Consumer>
        
        
    }
}

export default  Home