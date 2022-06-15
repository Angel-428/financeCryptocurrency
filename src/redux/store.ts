import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import accountsReducer from './slices/accounts';

const store = configureStore({
  reducer: {
    user: userReducer,
    accounts: accountsReducer,
  },
});

export default store;
