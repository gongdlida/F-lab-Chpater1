import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonText?: string
}

export const Button = ({ buttonText, ...props }: ButtonProps) => {
  return (
    <div className='button-group'>
      <button {...props}>{buttonText}</button>
    </div>
  )
}
