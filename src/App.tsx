import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction
} from 'react'
import './App.css'
import { PhoneNumber, VerificationCode } from '@/features/auth/components'
import { useSendVerificationCode, useVerifyCode } from '@/features/auth/hooks'

function App() {
  const [phoneNumber, setPhoneNumber] = useState('')

  const [isShownError, setIsShownError] = useState(false)
  const {
    isSuccess: isSent,
    sendVerificationCode,
    isLoading: isPhoneNumberSent,
    message: verificationCodeErrorMsg,
    reset: resetVerificationCodeStatus
  } = useSendVerificationCode()

  const {
    isLoading,
    verifyCode,
    isSuccess: isVerified,
    message: verifyCodeResultMsg,
    error: verifyCodeError,
    resetVerifyCodeError,
    reset: resetVerifyCodeStatus
  } = useVerifyCode()

  const phoneNumberErrorMsg = isShownError
    ? verificationCodeErrorMsg || '올바른 번호를 입력해주세요.'
    : ''
  return (
    <div className='app'>
      <h1>휴대폰 인증번호 테스트</h1>
      <p>MSW를 활용한 휴대폰 인증번호 API 테스트</p>

      <div className='form-container'>
        <PhoneNumber
          phoneNumber={phoneNumber}
          isSent={isSent}
          error={phoneNumberErrorMsg}
          onChangePhoneNumber={(event: ChangeEvent<HTMLInputElement>) => {
            if (verificationCodeErrorMsg || isShownError || isSent) {
              resetVerificationCodeStatus()
              resetVerifyCodeStatus()
            }
            const sanitize = event.target.value.replace(/[^0-9-]/g, '')
            checkValidFormat(sanitize, isShownError, setIsShownError)
            setPhoneNumber(sanitize)
          }}
          onSendVerificationCode={() => sendVerificationCode(phoneNumber)}
          isLoading={isPhoneNumberSent}
        />
        {isSent && (
          <VerificationCode
            isVerified={isVerified}
            onVerifyCode={verifyCode}
            verifyCodeError={verifyCodeError}
            resetVerifyCode={resetVerifyCodeError}
            verifyCodeResultMsg={verifyCodeResultMsg}
            isLoading={isLoading}
            phoneNumber={phoneNumber}
          />
        )}
      </div>

      <div className='info'>
        <h3>사용 방법:</h3>
        <ul>
          <li>휴대폰 번호를 입력하고 "인증번호 발송" 버튼을 클릭하세요</li>
          <li>콘솔에서 발송된 인증번호를 확인할 수 있습니다</li>
          <li>인증번호를 입력하고 "인증번호 확인" 버튼을 클릭하세요</li>
          <li>인증번호는 5분 후 만료됩니다</li>
        </ul>
      </div>
    </div>
  )
}

export default App

const isValidPhoneFormat = (value: string) => {
  const PHONE_REGEX = /^010-(\d{3}|\d{4})-\d{4}$/
  return PHONE_REGEX.test(value)
}

const checkValidFormat = (
  phoneNumber: string,
  isShownError: boolean,
  setIsShownError: Dispatch<SetStateAction<boolean>>
) => {
  if (phoneNumber.length < 10) return
  if (isShownError && isValidPhoneFormat(phoneNumber))
    return setIsShownError(false)
  if (isShownError === false && isValidPhoneFormat(phoneNumber) === false)
    return setIsShownError(true)

  return
}
