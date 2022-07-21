export interface SignUpData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface Company {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
}
