import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leadsSlice'

const store = configureStore({
    reducer: {
      leads: leadsReducer,
    },
  });
  
  export default store;