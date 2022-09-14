import client from './client'
import Cookies from 'js-cookie'
import { Company, UpdateCompanyFormData } from '../../interface'
import { AxiosResponse } from 'axios'

interface updateCompanyResponse {
  company: Company
}

export const getCompanies: (limit?: number) => Promise<AxiosResponse<Company[]>> = async (limit) => {
  return await client.get((limit !== undefined) ? `companies?limit=${limit}` : 'companies')
}

export const getSingleCompany: (id: string, mypage?: boolean) => Promise<AxiosResponse<Company>> = async (id, mypage) => {
  return await client.get(`companies/${id}?mypage=${String(mypage === true)}`, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}

export const updateCompany: (id: string, params: UpdateCompanyFormData) => Promise<AxiosResponse<updateCompanyResponse>> = async (id, params) => {
  return await client.patch(`companies/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token') ?? '',
      client: Cookies.get('_client') ?? '',
      uid: Cookies.get('_uid') ?? ''
    }
  })
}
