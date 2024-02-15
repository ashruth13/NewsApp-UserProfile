import React from 'react'
import {v4 as uuid} from 'uuid'

const NewsProfile = React.createContext({
    dark : false,
    wholeData: [],
    updateData : () => {},
    changeTheme : () => {},
    likedData : [],
    updateLiked : () => {},
    savedData : [],
    addToSaved : () => {}
})

export default NewsProfile