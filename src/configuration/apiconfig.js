import urls from "./config.json";

const config = () => {
  return urls.DEV;
};

export const apiURl = config();
