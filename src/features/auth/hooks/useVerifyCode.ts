import { useState } from 'react'
import type {
  VerificationResponse,
  VerifyCodeParamsType
} from '@/features/auth/type'
import { http } from '@/lib/http'

export const useVerifyCode = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const resetVerifyCodeError = () => {
    setError(false)
  }

  const verifyCode = async ({ code, phoneNumber }: VerifyCodeParamsType) => {
    setIsLoading(true)
    setMessage('')
    setError(false)

    try {
      const response = await http.post<
        { phoneNumber: string; code: string },
        VerificationResponse
      >('/api/auth/verify-code', { phoneNumber, code })

      if (response.success) {
        setMessage(response.message)
        setIsVerified(true)
        return
      }

      setMessage(response.message)
      setIsVerified(false)
      setError(true)
    } catch {
      setMessage('서버 오류가 발생했습니다.')
      setIsVerified(false)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isVerified,
    message,
    verifyCode,
    error,
    resetVerifyCodeError
  }
}
