import companiesApi from "../../common/apis/companiesApi";
import axios from "axios";
import BASE_URL from "../../common/apis/Api";

export const fetchCompanies = async (paramObject) => {
  if (paramObject.is_highlighted) {
    const response = await axios
      .get(`${BASE_URL}/companies`, {
        params: {
          query_text: paramObject.query_text || "",
          page: paramObject.page,
          size: paramObject.size,
          sort_by: paramObject.sort_by,
          sort: paramObject.sort,
          is_highlighted: paramObject.is_highlighted,
        },
      })
      .catch((err) => console.log(err));
    return response;
  } else if (paramObject.is_active) {
    if (paramObject.document_count) {
      const response = await axios
        .get(`${BASE_URL}/companies`, {
          params: {
            query_text: paramObject.query_text || "",
            is_active: paramObject.is_active,
            document_count: paramObject.document_count,
          },
        })
        .catch((err) => console.log(err));
      return response;
    } else {
      const response = await axios
        .get(`${BASE_URL}/companies`, {
          params: {
            query_text: paramObject.query_text || "",
            page: paramObject.page,
            size: paramObject.size,
            sort_by: paramObject.sort_by,
            sort: paramObject.sort,
            is_active: paramObject.is_active,
          },
        })
        .catch((err) => console.log(err));
      return response;
    }
  } else if (paramObject.state) {
    const response = await axios
      .get(`${BASE_URL}/companies`, {
        params: {
          state: paramObject.state,
        },
      })
      .catch((err) => console.log(err));
    return response;
  } else {
    const response = await axios
      .get(`${BASE_URL}/companies`, {
        params: {
          query_text: paramObject.query_text || "",
          page: paramObject.page,
          size: paramObject.size,
          sort_by: paramObject.sort_by,
          sort: paramObject.sort,
        },
      })
      .catch((err) => console.log(err));
    return response;
  }
};
export const fetchCompany = async (id) => {
  const response = await companiesApi
    .get(`/${id}`)
    .catch((err) => console.log(err));
  return response;
};
export const fetchCompanyImage = async (id) => {
  const response = await companiesApi
    .get(`/${id}/download`)
    .catch((err) => console.log(err));
  return response;
};

export const incrementCompanyView = async (id) => {
  const response = await companiesApi
    .patch(`/${id}/inc-view`)
    .catch((err) => console.log(err));
  return response;
};
