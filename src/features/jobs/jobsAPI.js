import jobsApi from "../../common/apis/jobsApi";
import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchJobs = async (paramObject) => {
  const response = await axios
    .get(`${BASE_URL}/jobs`, {
      params: {
        query_text: paramObject.what,
        location_query_text: paramObject.where,
        page: paramObject.page,
        sort_by: paramObject.sort_by,
        size: paramObject.size,
        sort: paramObject.sort,
        is_highlighted: paramObject.is_highlighted,
        date: paramObject.date,
      },
    })
    .catch((err) => console.log(err));
  return response;
};
export const incrementJobView = async (id) => {
  const response = await jobsApi
    .patch(`/${id}/inc-view`)
    .catch((err) => console.log(err));
  return response;
};
