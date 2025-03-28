import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {

  return (
    <Link href={"/"}>
      <Image alt='Logo' className='cursor-pointer' height={80} width={80} priority src='/images/logo.png' />
    </Link>
  )
}

export default Logo