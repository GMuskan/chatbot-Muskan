import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { personalInfo, REACT_APP_GEMINI_API_KEY } from "../utils";
import { toggleLoading, updateChatHistory } from "../Slices/chatbotSlice";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const useChatbot = () => {
  const chatbot = useSelector((store) => store.chatbot);
  const dispatch = useDispatch();

  const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fetchInformation = async (query) => {
    if (!query?.trim()) return;
    dispatch(toggleLoading(true));

    let botResponse = "";
    const normalizedQuery = query.trim().toLowerCase();
    const matchedKey = Object.keys(personalInfo).find(
      (key) => key.toLowerCase() === normalizedQuery
    );

    if (matchedKey) {
      botResponse = personalInfo[matchedKey];
    } else {
      try {
        const result = await model.generateContent(query);
        const response = await result.response;
        botResponse =
          response?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No information available";
      } catch (err) {
        botResponse = "Error fetching Response";
      }
    }
    dispatch(
      updateChatHistory([
        ...chatbot?.chatHistory,
        { query, response: botResponse },
      ])
    );
    dispatch(toggleLoading(false));
  };

  return { fetchInformation };
};
