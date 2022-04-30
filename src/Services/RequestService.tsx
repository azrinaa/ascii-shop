import { apiUrl } from "../Utils/Global";

export const get = async (url: string, requestData?: any, auth?: Boolean) => {
  let headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  const options = {
    method: "GET",
    headers,
  };

  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    return response.json();
  } catch (err) {
    console.warn(err);
    return { success: false, message: err.toString(), data: null };
  }
};
