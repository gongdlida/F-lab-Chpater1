interface ErrorMsgProps {
  errorMsg?: string
}
export const ErrorMsg = ({ errorMsg }: ErrorMsgProps) => {
  if (errorMsg === undefined) return null
  return (
    <div style={{ width: '100%', textAlign: 'start' }}>
      <text style={{ color: 'red' }}>{errorMsg}</text>
    </div>
  )
}
