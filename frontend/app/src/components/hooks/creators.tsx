import { getCreators, getSingleCreator } from '../../lib/api/creator'
import { useContext, useEffect, useState } from 'react'
import { Creator, Video } from '../../interface'
import { MessageContext } from '../providers/MessageProvider'

export const useHandleGetCreators: (limit?: number) => Creator[] | undefined = (limit) => {
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const [creators, setCreators] = useState<Creator[]>()

  useEffect(() => {
    getCreators(limit)
      .then((res) => {
        if (res.status === 200) {
          console.log('ユーザー一覧を取得しました')
          setCreators(res.data)
        } else {
          throw new Error()
        }
      }).catch(() => {
        setOpen(true)
        setMessage('ユーザー情報を取得できませんでした。')
        setSeverity('error')
      })
  }, [])

  return (creators)
}

export const useHandleGetSingleCreator: (id: string) => {creator: Creator | undefined, videos: Video[] | undefined} = (id) => {
  const { setOpen, setMessage, setSeverity } = useContext(MessageContext)
  const [creator, setCreator] = useState<Creator>()
  const [videos, setVideos] = useState<Video[]>()

  useEffect(() => {
    getSingleCreator(id)
      .then((res) => {
        if (res.status === 200) {
          console.log('ユーザー一覧を取得しました')
          setCreator(res.data.creatorInfo)
          setVideos(res.data.creatorVideos)
        } else {
          throw new Error()
        }
      }).catch(() => {
        setOpen(true)
        setMessage('ユーザー情報を取得できませんでした。')
        setSeverity('error')
      })
  }, [])

  return { creator, videos }
}
