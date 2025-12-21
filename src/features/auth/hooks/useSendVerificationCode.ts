import { http, type CommonResponse } from '@/lib/http'
import { useState } from 'react'
import type { VerificationResponse } from '@/features/auth/type'

export const useSendVerificationCode = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState<string>('')

  const reset = () => {
    setIsSuccess(false)
    setMessage('')
  }

  const sendVerificationCode = async (phoneNumber: string) => {
    setIsLoading(true)
    setMessage('')
    try {
      const res = await http.post<
        { phoneNumber: string },
        VerificationResponse
      >('/api/auth/send-verification', { phoneNumber })

      if (res.success) {
        return setIsSuccess(true)
      }
      setIsSuccess(false)
      setMessage(res.message)
    } catch (error) {
      const _error = error as CommonResponse<void>
      setIsSuccess(false)
      setMessage(_error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isSuccess,
    message,
    sendVerificationCode,
    reset
  }
}
