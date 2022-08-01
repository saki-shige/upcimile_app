import client from "./client"

export const getCompanies = () => {
  return client.get("companies")
};

export const getSingleCompany = (id: string) => {
  return client.get(`companies/${id}`);
};

export const updateCompany = (id: string, params: any) => {
  return client.patch(`companies/${id}`, params);
};

