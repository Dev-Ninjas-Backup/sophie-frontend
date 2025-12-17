

export interface Admin {
  id: string
  email: string
  password: string
  role: "USER" | "ADMIN"
  createdAt: string
}

// ================= Members =================
export interface Registration {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string | null
  teudatZehut: string
  aliyahDate: string

  membershipId: string
  validFrom: string
  validTo: string
  paymentMethod?: string | null
  isActive: boolean

  otp?: string | null
  otpExpiresAt?: string | null
  otpAttemptCount: number
  otpWindowStart?: string | null

  createdAt: string
}

// ================= Category / Partner =================
export interface Category {
  id: string
  name: string
    partners: Partner[]
}

export interface Partner {
  id: string
  name: string
  discount: string
  categoryId: string
  category?: Category
}

// ================= Redeem =================
export interface Redeem {
  id: string
  registrationId: string
  partnerId: string
  redeemedAt: string
  registration?: Registration
  partner?: Partner
}

// ================= Payment =================
export interface Payment {
  id: string
  registrationId: string
  stripeSessionId?: string | null
  amount: number
  currency: string
  status: string
  method?: string | null
  cardholderName?: string | null
  cardNumber?: string | null
  expireDate?: string | null
  cvc?: string | null
  createdAt: string
}
