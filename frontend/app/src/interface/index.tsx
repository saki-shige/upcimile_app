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
  email: string
  name: string
  image?: {
    url: string
  }
  introduction?: string
  address?: string
  numberOfEmployees?: number
  capital?: number
  dateOfEstablishment?: string
  corporateSite?: string
  products?: Product[]
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
  append: (name: keyof UpdateProductData, value: String | Blob, fileName?: string) => any
}

export interface Product {
  id: number
  name: string
  introduction: string
  availableFrom: string
  availableTo?: string
  canBeProvided: boolean
  companyId: number
  categoryId: number
  image: {
    url: string
  }
  company?: Company
}

export interface FormProduct {
  name: string
  introduction: string
  availableFrom: string
  availableTo?: string
  canBeProvided?: boolean
  companyId: number
  categoryId: number
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
  append: (name: keyof UpdateProductData, value: string | Blob, fileName?: string) => any
}

export interface Creator {
  id: number
  name: string
  subscriberCount: string
  introduction: string
  image: string
}

export interface Video {
  title: string
  thumbnail: string
  introduction: string
  url: string
}

export interface MyOffers {
  id: number
  creatorId: number
  product_Id: number
  isAccepted: boolean
  product: Product
}

export interface OffersToMe {
  id: number
  creatorId: number
  product_Id: number
  isAccepted: boolean
  product: Product
  creator: Creator
}
