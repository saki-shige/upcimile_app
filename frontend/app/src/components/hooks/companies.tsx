import { getCompanies, getSingleCompany } from '../../lib/api/company'
import { useContext, useEffect, useState } from 'react'
import { Company } from '../../interface'
import { MessageContext } from '../providers/MessageProvider'

export const useHandleGetCompanies: (limit?: number) => Company[] | undefined = (limit) => {
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const [companies, setCompanies] = useState<Company[]>()

  useEffect(() => {
    getCompanies(limit)
      .then((res) => {
        if (res.status === 200) {
          console.log('ユーザー一覧を取得しました')
          setCompanies(res.data)
        } else {
          throw new Error()
        }
      }).catch(() => {
        setOpen(true)
        setMessage('ユーザー情報を取得できませんでした。')
        setSeverity('error')
      })
  }, [])

  return (companies)
}

export const useHandleGetSingleCompany: (id: string, update: boolean) => Company | undefined = (id, update) => {
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const [company, setCompany] = useState<Company>()

  useEffect(() => {
    getSingleCompany(id)
      .then((res) => {
        if (res.status === 200) {
          console.log('ユーザー情報を取得しました')
          setCompany(res.data)
        } else {
          throw new Error()
        }
      }).catch(() => {
        setOpen(true)
        setMessage('ユーザー情報を取得できませんでした。')
        setSeverity('error')
      })
  }, [update])

  return (company)
}
