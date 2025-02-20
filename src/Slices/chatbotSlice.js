import { createSlice } from "@reduxjs/toolkit";
const chatbotSlice = createSlice({
  name: "chatbot",
  initialState: {
    chatHistory: [],
    loading: false,
  },
  reducers: {
    updateChatHistory: (state, action) => {
      state.chatHistory = action.payload;
    },
    toggleLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { updateChatHistory, toggleLoading } = chatbotSlice.actions;
export default chatbotSlice.reducer;
