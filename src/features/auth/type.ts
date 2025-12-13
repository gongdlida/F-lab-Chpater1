export const MSG_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  NONE: 'none'
} as const

export type MsgType = (typeof MSG_TYPE)[keyof typeof MSG_TYPE]

export type VerificationResponse = {
  phoneNumber?: string
  expiresAt?: number
  verified?: boolean
}

export type VerifyCodeParamsType = {
  phoneNumber: string
  code: string
}
