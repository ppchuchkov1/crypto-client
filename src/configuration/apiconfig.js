import urls from "./config.json";

const config = () => {
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  return isLocal ? urls.DEV : urls.PROD;
};

export const apiURl = config();
