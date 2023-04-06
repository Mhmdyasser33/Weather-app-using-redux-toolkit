import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "./weatherSlice";

// Create a new Redux store using the configureStore function from the @reduxjs/toolkit library
export const store = configureStore({
  reducer: { // Define the root reducer for the store
    weather: weatherSlice // Use the weatherSlice reducer for the "weather" state slice
  }
})