import jobsApi from "../../common/apis/jobsApi";
import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchJobs = async (paramObject) => {
  if (paramObject.is_highlighted) {
    const response = await axios
      .get(`${BASE_URL}/jobs`, {
        params: {
          is_highlighted: paramObject.is_highlighted,
        },
      })
      .catch((err) => console.log(err));
    return response;
  } else if (paramObject.document_count) {
    const response = await axios
      .get(`${BASE_URL}/jobs`, {
        params: {
          company_query_text: paramObject.company,
          date: paramObject.date,
          document_count: paramObject.document_count,
        },
      })
      .catch((err) => console.log(err));
    return response;
  } else {
    const response = await axios
      .get(`${BASE_URL}/jobs`, {
        params: {
          query_text: paramObject.what,
          location_query_text: paramObject.where,
          company_query_text: paramObject.company,
          page: paramObject.page,
          sort_by: paramObject.sort_by,
          sort: paramObject.sort,
          date: paramObject.date,
          size: paramObject.size,
        },
      })
      .catch((err) => console.log(err));
    return response;
  }
};
export const incrementJobView = async (id) => {
  const response = await jobsApi
    .patch(`/${id}/inc-view`)
    .catch((err) => console.log(err));
  return response;
};
