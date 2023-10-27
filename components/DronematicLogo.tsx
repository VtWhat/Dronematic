import Image from 'next/image'
import Link from 'next/link'
 
export default function DronematicLogo() {
  return (
    <Link href='/home'>
      <Image
        src="/dronematic-logo.png"
        width={150}
        height={200}
        alt="Dronematic Logo"
      />
    </Link>
  )
}