import { configureStore } from '@reduxjs/toolkit'; 
import widgetSlice from './widgetSlice'; 
const store = configureStore(
    { reducer: { widget: widgetSlice, }, 
}); 
export default store;