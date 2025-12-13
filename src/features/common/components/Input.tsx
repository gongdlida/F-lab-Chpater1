import type { ChangeEvent, InputHTMLAttributes } from 'react'
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
  return (
    <div className='form-group'>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        id={label}
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
