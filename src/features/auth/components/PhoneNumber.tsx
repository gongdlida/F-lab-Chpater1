import { useState, type Dispatch, type SetStateAction } from 'react'
import { Input, Button, ErrorMsg } from '@/features/common/components'

interface PhoneNumberProps {
  phoneNumber: string
  setPhoneNumber: (phoneNumber: string) => void
  isLoading: boolean
  sendVerificationCode: (phoneNumber: string) => Promise<void>
  error: string
  reset: () => void
}

export const PhoneNumber = ({
  phoneNumber,
  setPhoneNumber,
  isLoading,
  sendVerificationCode,
  error,
  reset
}: PhoneNumberProps) => {
  const [isShownError, setIsShownError] = useState(false)

  return (
    <div className='form-group' style={{ flex: 1 }}>
      <Input
        value={phoneNumber}
        maxLength={13}
        onChange={(e) => {
          if (error) reset()
          checkValidFormat(e.target.value, isShownError, setIsShownError)

          const sanitize = e.target.value.replace(/[^0-9-]/g, '')
          setPhoneNumber(sanitize)
        }}
        label='휴대폰 번호:'
        placeholder='휴대폰 번호를 입력해주세요.'
      />
      <div style={{ height: '1.5rem' }}>
        <ErrorMsg
          errorMsg={isShownError ? error || '올바른 번호를 입력해주세요.' : ''}
        />
      </div>
      <Button
        onClick={() => sendVerificationCode(phoneNumber)}
        disabled={!phoneNumber || isLoading || isShownError}
        className='send-button'
        buttonText={isLoading ? '전송 중...' : '인증번호 발송'}
      />
    </div>
  )
}

const isValidPhoneFormat = (value: string) => {
  const PHONE_REGEX = /^010-(\d{3}|\d{4})-\d{4}$/
  return PHONE_REGEX.test(value)
}

const checkValidFormat = (
  phoneNumber: string,
  isShownError: boolean,
  setIsShownError: Dispatch<SetStateAction<boolean>>
) => {
  if (isShownError && isValidPhoneFormat(phoneNumber))
    return setIsShownError(false)
  if (isShownError === false && isValidPhoneFormat(phoneNumber) === false)
    return setIsShownError(true)

  return
}

/*
// 번호 입력 시 포맷팅 함수 적용
const formatPhoneNumber = (raw: string) => {
  const digits = raw.replace(/\D/g, '').slice(0, 11) // 최대 11자리

  if (digits.length <= 3) return digits

  // 10자리(3-3-4)
  if (digits.length === 10) {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  }

  // 11자리(3-4-4)
  if (digits.length >= 11) {
    return digits.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }

  // 4~9자리는 자연스럽게 진행되도록 3-나머지 형태로
  return digits.replace(/(\d{3})(\d+)/, '$1-$2')
}

*/
