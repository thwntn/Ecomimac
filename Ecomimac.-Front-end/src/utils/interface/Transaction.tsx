export interface PackageDictionary {
  PACKAGE_FREE: Package
  PACKAGE_PERSONAL: Package
  PACKAGE_BUSINESS: Package
}

export interface Package {
  name: string
  limit: number
  pricing: number
}
