import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchNews = async (paramObject) => {
  const response = await axios
    .get(`${BASE_URL}/news`, {
      params: {
        page: paramObject.page,
        size: paramObject.size,
      },
    })
    .catch((err) => console.log(err));
  return response;
};
export const fetchNewsOne = async (id) => {
  const response = await axios
    .get(`${BASE_URL}/news/${id}`)
    .catch((err) => console.log(err));
  return response;
};
export const incrementNewsView = async (id) => {
  const response = await axios
    .patch(`${BASE_URL}/news/${id}/inc-view`)
    .catch((err) => console.log(err));
  return response;
};
