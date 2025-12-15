import { type ChangeEvent } from 'react'
import { Input, Button, ErrorMsg } from '@/features/common/components'

interface PhoneNumberProps {
  phoneNumber: string
  onChangePhoneNumber: (event: ChangeEvent<HTMLInputElement>) => void
  isLoading: boolean
  onSendVerificationCode: () => Promise<void>
  error: string
  isSent: boolean
}

export const PhoneNumber = ({
  phoneNumber,
  onChangePhoneNumber,
  isLoading,
  onSendVerificationCode,
  error
}: PhoneNumberProps) => {
  return (
    <div className='form-group' style={{ flex: 1 }}>
      <Input
        value={phoneNumber}
        maxLength={13}
        onChange={onChangePhoneNumber}
        label='휴대폰 번호:'
        placeholder='휴대폰 번호를 입력해주세요.'
      />
      <div style={{ height: '1.5rem' }}>
        <ErrorMsg errorMsg={error} />
      </div>
      <Button
        onClick={onSendVerificationCode}
        disabled={!phoneNumber || isLoading || error !== ''}
        className='send-button'
        buttonText={isLoading ? '전송 중...' : '인증번호 발송'}
      />
    </div>
  )
}
