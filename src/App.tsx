import { useState } from 'react'
import './App.css'
import { PhoneNumber, VerificationCode } from '@/features/auth/components'
import { MSG_TYPE } from '@/features/auth/type'
import { useSendVerificationCode, useVerifyCode } from '@/features/auth/hooks'

function App() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verificationCode, setVerificationCode] = useState('')

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

  return (
    <div className='app'>
      <h1>휴대폰 인증번호 테스트</h1>
      <p>MSW를 활용한 휴대폰 인증번호 API 테스트</p>

      <div className='form-container'>
        <PhoneNumber
          phoneNumber={phoneNumber}
          isSent={isSent}
          error={verificationCodeErrorMsg}
          reset={() => {
            resetVerificationCodeStatus()
            resetVerifyCodeStatus()
            setVerificationCode('')
          }}
          setPhoneNumber={setPhoneNumber}
          sendVerificationCode={sendVerificationCode}
          isLoading={isPhoneNumberSent}
        />
        {isSent && (
          <VerificationCode
            resetVerifyCode={resetVerifyCodeError}
            isVerified={isVerified}
            verifyCodeError={verifyCodeError}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
            verifyCode={verifyCode}
          />
        )}
        {isSent && verifyCodeResultMsg && (
          <div
            className={`message ${
              isVerified ? MSG_TYPE.SUCCESS : MSG_TYPE.ERROR
            }`}
          >
            {verifyCodeResultMsg}
          </div>
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
