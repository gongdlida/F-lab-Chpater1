import { http, type CommonResponse } from '@/lib/http'
import { useState } from 'react'
import type { VerificationResponse } from '@/features/auth/type'

export const useSendVerificationCode = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string>('')

  const reset = () => {
    setIsSent(false)
    setError('')
  }

  const sendVerificationCode = async (phoneNumber: string) => {
    setIsLoading(true)
    setError('')
    try {
      const res = await http.post<
        { phoneNumber: string },
        VerificationResponse
      >('/api/auth/send-verification', { phoneNumber })

      if (res.success) {
        return setIsSent(true)
      }
      setError(res.message)
    } catch (error) {
      const _error = error as CommonResponse<void>
      setIsSent(false)
      setError(_error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    isSent,
    error,
    sendVerificationCode,
    reset
  }
}
