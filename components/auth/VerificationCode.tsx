import { useDeferredValue } from 'react'
import { Input, Button } from '../common'

interface VerificationCodeProps {
  verificationCode: string
  hasPhoneNumber: boolean
  setVerificationCode: (verificationCode: string) => void
  isLoading: boolean
  verifyCode: () => Promise<void>
}

export const VerificationCode = ({
  verificationCode,
  setVerificationCode,
  isLoading,
  hasPhoneNumber,
  verifyCode
}: VerificationCodeProps) => {
  const deferredQuery = useDeferredValue(verificationCode)
  return (
    <div
      className='form-group'
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <Input
        label='인증번호:'
        placeholder='6자리 인증번호'
        disabled={isLoading}
        maxLength={6}
        id='verificationCode'
        type='text'
        value={verificationCode}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, '')
          setVerificationCode(e.target.value)
        }}
      />

      <Button
        onClick={verifyCode}
        disabled={isLoading || hasPhoneNumber || !isValidCode(deferredQuery)}
        className='verify-button'
        buttonText={isLoading ? '확인 중...' : '인증번호 확인'}
      />
    </div>
  )
}

const isValidCode = (code: string) => /^\d{6}$/.test(code)
