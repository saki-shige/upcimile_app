import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios'

// https://qiita.com/P-man_Brown/items/652d150ff4aa668757e0
// https://qiita.com/ksh-fthr/items/2daaaf3a15c4c11956e9

const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL
}), options)

export default client
