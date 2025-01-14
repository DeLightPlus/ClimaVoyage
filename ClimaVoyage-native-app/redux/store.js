import { configureStore } from '@reduxjs/toolkit';
import shoppingReducer from './reducers';

const store = configureStore({
    reducer: {
        shopping: shoppingReducer,
    },
});

export default store;
