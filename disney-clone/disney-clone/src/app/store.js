import {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import { loginReducer } from '../features/login/loginSlice';
import { movieReducer } from '../features/movie/movieSlice';
import {userReducer} from '../features/user/userSlice';

export default configureStore({
    reducer:{
        user:userReducer,
        movie:movieReducer,
        login:loginReducer
    },
    middleware:
    (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck:false

    })
});