import client from "./client"
import Cookies from "js-cookie"
import axios from "axios"

export const makeOffer = (data: {idToken: string, product_id:string})  => {
  return client.post('/offers', data)
}

export const respondToOffer = (id:number, type:'accept' | 'decline') => {
  return client.put(`/offers/${id}?type=${type}`, {}, {headers: {
    "access-token": Cookies.get("_access_token") || '',
    "client": Cookies.get("_client") || '',
    "uid": Cookies.get("_uid") || '',
  },
  });
}

export const getOffersToMe = () => {
  return client.get('/offers?part=company', {headers: {
    "access-token": Cookies.get("_access_token") || '',
    "client": Cookies.get("_client") || '',
    "uid": Cookies.get("_uid") || '',
  },
  });
}

export const getMyOffers = (data: {idToken: string}) => {
return axios.get('http://localhost:3001/api/v1/offers?part=creator', {
  headers: {
    Authorization: `Bearer ${data.idToken}`,
  }
});
}
