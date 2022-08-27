import client from "./client"
import Cookies from "js-cookie"

export const getCompanies = (limit?: number) => {
  return client.get((limit !== undefined) ? `companies?limit=${limit}` : 'companies')
}

export const getSingleCompany = (id: string) => {
  return client.get(`companies/${id}`, { headers: {
    "access-token": Cookies.get("_access_token") || '',
    "client": Cookies.get("_client") || '',
    "uid": Cookies.get("_uid") || ''
  }});
};

export const updateCompany = (id: string, params: any) => {
  return client.patch(`companies/${id}`, params,{ headers: {
    "access-token": Cookies.get("_access_token") || '',
    "client": Cookies.get("_client") || '',
    "uid": Cookies.get("_uid") || ''
  }});
};

