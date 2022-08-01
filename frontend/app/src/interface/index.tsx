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
  image?: {
    url: string
  }
  allowPasswordChange: boolean
  introduction?: string
  address?: string
  numberOfEmployees?: number
  capital?: number
  dateOfEstablishment?: Date
  corporateSite?: string
}

export interface UpdateCompanyData {
  name: string
  image?: string
  introduction?: string
  address?: string
  number_of_employees?: number
  capital?: number
  date_of_establishment?: string
  corporate_site?: string
}

export interface UpdateCompanyFormData extends FormData {
  append(name: keyof UpdateProductData, value: String | Blob, fileName?: string): any
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
