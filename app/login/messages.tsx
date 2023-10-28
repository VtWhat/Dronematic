'use client'

import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

export default function Messages() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const message = searchParams.get('message')
  return (
    <>
      {error && (
        <p className="text-center text-red-500">
          {error}
        </p>
      )}
      {message && (
        <p className="text-center text-green-500">
          {message}
        </p>
      )}
    </>
  )
}
