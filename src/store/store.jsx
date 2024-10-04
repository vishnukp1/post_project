import { configureStore } from "@reduxjs/toolkit";

import commentReducer from "../reducers/commentReducer"

const store= configureStore({
    reducer:{
       comment :commentReducer
        
    }
})

export default store