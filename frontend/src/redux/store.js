import { configureStore } from '@reduxjs/toolkit';
import profile from './slices/ProfileSlice';
import product from './slices/ProductSlice';
import cart from './slices/CartSlice';
import notification from './slices/NotificationSlice';



export default configureStore({
    reducer: {
      product,
      profile,
      cart, 
      notification
    },
  });
