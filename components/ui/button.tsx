'use client'

import Link from 'next/link'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' 
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const base = 'font-medium inline-flex items-center justify-center transition-colors duration-200 cursor-pointer'

  const variants = {
    primary: 'bg-blue-900 text-white hover:bg-blue-950',
    secondary: 'bg-yellow-400 text-black hover:bg-yellow-700',
    outline: 'border-2 border-blue-900 text-blue-900 hover:bg-blue-950 hover:text-white',
    ghost: 'text-blue-600 hover:bg-blue-100',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-6 py-3 text-lg font-semibold',
  }

  const styles = clsx(base, variants[variant], sizes[size], className)

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
