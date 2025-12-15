import { Input, Button } from '@/features/common/components'
import type { VerifyCodeParamsType } from '@/features/auth/type'

interface VerificationCodeProps {
  verificationCode: string
  phoneNumber: string
  setVerificationCode: (verificationCode: string) => void
  isLoading: boolean
  verifyCode: (params: VerifyCodeParamsType) => Promise<void>
  isVerified: boolean
  verifyCodeError: boolean
  resetVerifyCode: () => void
}

export const VerificationCode = ({
  verificationCode,
  setVerificationCode,
  isLoading,
  phoneNumber,
  verifyCode,
  isVerified,
  verifyCodeError,
  resetVerifyCode
}: VerificationCodeProps) => {
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
        id='verification-code'
        type='text'
        value={verificationCode}
        onChange={(e) => {
          if (verifyCodeError) resetVerifyCode()
          const sanitize = e.target.value.replace(/[^0-9]/g, '')
          setVerificationCode(sanitize)
        }}
      />

      <Button
        onClick={() => verifyCode({ code: verificationCode, phoneNumber })}
        disabled={
          isLoading ||
          !isValidCode(verificationCode) ||
          isVerified ||
          verifyCodeError
        }
        className='verify-button'
        buttonText={isLoading ? '확인 중...' : '인증번호 확인'}
      />
    </div>
  )
}

const isValidCode = (code: string) => /^\d{6}$/.test(code)
