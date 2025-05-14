'use client'
import { sidebarContent } from '@/constants'
import { usePathname } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
const Sidebar = () => {

  const pathname = usePathname();
  return (

    <>
      <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-black p-6 pt-26 max-sm:hidden '>
        <div className=' flex flex-1 flex-col gap-6'>
          {sidebarContent.map((link) => {

            const isActive = pathname === link.route || (pathname === '/' && link.route === '/');

            return (
              <Link
                href={link.route}
                key={link.label}
                className={cn('flex gap-6 items-center rounded-lg justify-start mb-4 p-4 ', {
                  'bg-dark-2': isActive,
                  'hover:bg-none':isActive,
                  'hover:bg-blue-500': !isActive,
                })}
              >
                <Image
                  src={link.imgUrl}
                  alt={link.label}
                  width={24}
                  height={24}
                />

                <p className=' text-lg font-semibold flex-row max-lg:hidden'>
                  {link.label}
                </p>

              </Link>
            )
          })}

        </div>
      </section>
    </>
  )
}

export default Sidebar