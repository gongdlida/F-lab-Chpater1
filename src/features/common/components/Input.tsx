import { useId, type ChangeEvent, type InputHTMLAttributes } from 'react'
import { ErrorMsg } from '@/features/common/components'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value: HTMLInputElement['value']
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  errorMsg?: string
}

export const Input = ({
  value,
  onChange,
  disabled = false,
  errorMsg,
  label,
  ...props
}: InputProps) => {
  const reactId = useId()
  const id = props.id || reactId

  return (
    <div className='form-group'>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type='text'
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      <ErrorMsg errorMsg={errorMsg} />
    </div>
  )
}
