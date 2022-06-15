export interface LoginData {
    access_token: string
    refresh_token: string
    is_first_login: boolean
    is_mfa_active: boolean
    session_key: string
    id_token: string
    expires_in: number
    expiry_time: number
    login_time: number
    date: string
    email: string
    username: string
    phone_number: string
    user_id: number
    owner_company: number
    programme_manager: number
    subprogramme_manager: number
    corporate: number
    entity_id: number
    default_profile: string
    current_profile: string
    permissions: string[]
    user_state: string
    user_status: string
    user_upcoming_status: string
    msgAlreadyShown: boolean
    kybStatus: string
    onboardingStatus: string
    entity_name: string
}

export interface CurrencyInterface {
    currencyName: string
    fundsAvailable: number
    reservedBalance: number
    accountBalance: number
}

export interface AccountDataInterface {
    accountName: string
    accountId: string
    accountHolderName: string
    iBan: string
    currencyData: CurrencyInterface
    accountNumber: number
    accountType: string
    paymentMethod: string
    sortCode: number
    feeDepositeAccountId: number
    feeDepositOwnerName?: string
    feeDepositAccountIBan: string
    pAndTType: string
    providerName: string
}

export interface UserProfileInterface {
    city: string
    state: string
    email: string
    gender: string
    user_id: number
    country: string
    username: string
    zip_code: string
    birthdate: string
    entity_id: number
    address_1: string
    corporate: string
    address_2: string
    last_name: string
    first_name: string
    occupation: string
    home_phone: string
    work_phone: string
    middle_name: string
    'get-user': boolean
    phone_number: string
    owner_company: number
    is_first_login: boolean
    email_verified: boolean
    white_label_url: string
    self_registered: boolean
    programme_manager: number
    subprogramme_manager: number
    phone_number_verified: boolean
}