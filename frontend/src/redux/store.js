import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
import userReducer from './user/userSlice';
import themeReducer from './themeContext/themeSlice';



// redux persist start 

// this will combine the reducers
 const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
 })

// this will persist the user reducer
 const persistConfig = {
  key: 'root',
  storage: storage,
  version: 1,
}
 
// this will create a persisted reducer
 const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store);

// redux persist end 

