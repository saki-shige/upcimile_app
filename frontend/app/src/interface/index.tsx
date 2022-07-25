export interface SignUpData {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInData {
  email: string
  password: string
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

export interface Product {
  id: number
  name: string
  introduction: string
  available_from: Date
  available_to?: Date
  can_be_provided: boolean
  company_id: number
  createdAt?: Date
  updatedAt?: Date
}
