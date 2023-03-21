const BASE_URL =
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "local"
    ? "http://192.168.0.28:5000"
    : "https://kerbb.com/api";

export default BASE_URL;
