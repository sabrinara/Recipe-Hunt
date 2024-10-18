import { Nexios } from "nexios-http";

const nexiosInstance = new Nexios({
  baseURL: "https://receipe-booking-server.vercel.app/api/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default nexiosInstance;