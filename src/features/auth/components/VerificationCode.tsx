import { Input, Button } from '@/features/common/components'
import { MSG_TYPE, type VerifyCodeParamsType } from '@/features/auth/type'
import { useState } from 'react'

interface VerificationCodeProps {
  phoneNumber: string
  isLoading: boolean
  onVerifyCode: (params: VerifyCodeParamsType) => Promise<void>
  isVerified: boolean
  verifyCodeError: boolean
  resetVerifyCode: () => void
  verifyCodeResultMsg: string
}

export const VerificationCode = ({
  isLoading,
  phoneNumber,
  onVerifyCode,
  isVerified,
  verifyCodeError,
  resetVerifyCode,
  verifyCodeResultMsg
}: VerificationCodeProps) => {
  const [verificationCode, setVerificationCode] = useState('')
  return (
    <>
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
          onClick={() => onVerifyCode({ code: verificationCode, phoneNumber })}
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
      {verifyCodeResultMsg && (
        <div
          className={`message ${
            isVerified ? MSG_TYPE.SUCCESS : MSG_TYPE.ERROR
          }`}
        >
          {verifyCodeResultMsg}
        </div>
      )}
    </>
  )
}

const isValidCode = (code: string) => /^\d{6}$/.test(code)
