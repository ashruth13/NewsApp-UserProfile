import React from 'react'

// All functions and data that are shared between all pages are used here

const NewsProfile = React.createContext({
    dark : false,
    changeTheme : () => {},
    likedData : [],
    updateLiked : () => {},
    savedData : [],
    addToSaved : () => {}
})

export default NewsProfile