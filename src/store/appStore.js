import { configureStore } from "@reduxjs/toolkit";
import chatbotReducer from "../Slices/chatbotSlice";

export const appStore = configureStore({
  reducer: {
    chatbot: chatbotReducer,
  },
});
