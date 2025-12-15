import { useState } from 'react'
import type {
  VerificationResponse,
  VerifyCodeParamsType
} from '@/features/auth/type'
import { http, type CommonResponse } from '@/lib/http'

export const useVerifyCode = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')

  const reset = () => {
    setIsLoading(false)
    setMessage('')
    setError(false)
  }
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
        setIsSuccess(true)
        return
      }
      setMessage(response.message)
      setIsSuccess(false)
      setError(true)
    } catch (error) {
      const _error = error as CommonResponse<void>
      setMessage(_error.message)
      setIsSuccess(false)
      setError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isSuccess,
    message,
    verifyCode,
    error,
    resetVerifyCodeError,
    reset
  }
}
