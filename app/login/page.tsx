import Link from 'next/link'
import Messages from './messages'
import Image from 'next/image'
import NavBar from '@/components/NavBar'
import LoginForm from './LoginForm'

export default function Login() {
  return (
    <div>

      {/* <NavBar session={null} /> */}

      <LoginForm />

    </div>
  )
}
