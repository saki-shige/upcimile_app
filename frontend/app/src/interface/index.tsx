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
  id?: number
  name: string
  introduction?: string
  availableFrom: string
  availableTo?: string
  canBeProvided: boolean
  companyId: number
  categoryId?: number
  image: {
    url: string
  }
}

export interface UpdateProductData {
  id: number | undefined | null
  name?: string
  introduction?: string
  availableFrom: string
  availableTo?: string
  canBeProvided: boolean
  companyId: number
  categoryId?: number
  image?: string
}

export interface UpdateProductFormData extends FormData {
  append(name: keyof UpdateProductData, value: String | Blob, fileName?: string): any
}
