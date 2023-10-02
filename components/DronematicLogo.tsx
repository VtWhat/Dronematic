import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="/dronematic-logo.png"
      width={150}
      height={200}
      alt="Dronematic Logo"
    />
  )
}