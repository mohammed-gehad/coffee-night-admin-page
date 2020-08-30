import { store } from "../app/store";
import io from "socket.io-client";
import { asyncOrders, receiveMessage } from "../features/orders/ordersSlice";
import { toast } from "react-toastify";
const axios = require("axios");

const baseURL = "http://localhost:4000";

export const socket = io(baseURL);

export const identify = async (id) => {
  if (id) socket.emit("identify", id);
  socket.emit("jointAdminRoom");
};

socket.on("connect", () => {
  const id = store.getState().auth?.user?._id;
  if (id) identify(id);

  socket.on("orderAdded", () => {
    store.dispatch(asyncOrders());
    toast("new order", { autoClose: 60000 });
  });
  socket.on("messageToAdmin", ({ id, message, unreadMessagesForAdmin }) => {
    store.dispatch(receiveMessage({ id, message, unreadMessagesForAdmin }));
    toast(message.message, { autoClose: 30000 });
  });
});

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = store.getState().auth.token;
    const id = store.getState().auth.user?._id;

    if (token) {
      config.headers.token = token;
    }
    if (id) {
      identify(id);
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
