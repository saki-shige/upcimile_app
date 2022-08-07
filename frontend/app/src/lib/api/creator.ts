import client from "./client"
import axios from "axios";

export const login = (data: any) => {
  return client.post('/auth/creators', data)
};

export const getChannelId = (access_token: string) => {
  return axios.get('https://www.googleapis.com/youtube/v3/channels?part=id&mine=true', {
    headers: {
      Authorization: `Bearer ${access_token}`,
    }
  })
}

export const getCreators = () => {
  return client.get('/creators')
}

export const getSingleCreator = (id: string) => {
  return client.get(`creators/${id}`);
};
