interface ErrorMsgProps {
  errorMsg?: string
}
export const ErrorMsg = ({ errorMsg }: ErrorMsgProps) => {
  return (
    <div style={{ width: '100%', textAlign: 'start' }}>
      {errorMsg && <text style={{ color: 'red' }}>{errorMsg}</text>}
    </div>
  )
}
