interface ErrorMsgProps {
  errorMsg?: string
}
export const ErrorMsg = ({ errorMsg }: ErrorMsgProps) => {
  return (
    <div style={{ width: '100%', textAlign: 'start' }}>
      {errorMsg && (
        <span style={{ color: 'red', fontSize: 14 }}>{errorMsg}</span>
      )}
    </div>
  )
}
