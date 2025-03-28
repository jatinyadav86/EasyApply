import Link from 'next/link'

export const CategoryBox = ({ label, icon: Icon, route }) => {

  return (
    <Link href={`/services/${route}`}>
      <div className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer border-transparent text-neutral-500`}>
        <Icon size={24} />
        <div className="font-medium text-xs text-nowrap">{label}</div>
      </div>
    </Link>
  )
}
