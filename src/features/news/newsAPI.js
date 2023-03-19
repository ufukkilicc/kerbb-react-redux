import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchNews = async (paramObject) => {
  if (paramObject.query_text) {
    const response = await axios
      .get(`${BASE_URL}/news`, {
        params: {
          page: paramObject.page,
          size: paramObject.size,
          query_text: paramObject.query_text,
        },
      })
      .catch((err) => (err));
    return response;
  } else {
    const response = await axios
      .get(`${BASE_URL}/news`, {
        params: {
          page: paramObject.page,
          size: paramObject.size,
        },
      })
      .catch((err) => (err));
    return response;
  }
};
export const fetchNewsOne = async (id) => {
  const response = await axios
    .get(`${BASE_URL}/news/${id}`)
    .catch((err) => (err));
  return response;
};
export const incrementNewsView = async (id) => {
  const response = await axios
    .patch(`${BASE_URL}/news/${id}/inc-view`)
    .catch((err) => (err));
  return response;
};
