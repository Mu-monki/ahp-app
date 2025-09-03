import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

const Menu = () => {
    const NCPAG_LINK = process.env.NCPAG_LINK
    const GRIT_LINK = process.env.GRIT_FB_LINK

    return (
    <>
        <div className="my-6 flex justify-center items-center">
            <Link href={ NCPAG_LINK ?? 'https://ncpag.upd.edu.ph/' } passHref>
                <Image
                    src="/assets/ncpag-logo.png"
                    width={75}
                    height={75}
                    className='m-1'
                    alt=""
                />
            </Link>
            <Link href={ GRIT_LINK ?? 'https://www.facebook.com/UPNCPAGGRITLabs' } passHref>
                <Image
                    src="/assets/grit-logo-round.png"
                    width={80}
                    height={80}
                    className='m-1'
                    alt=""
                />
            </Link>
        </div>

        <h1 className="text-2xl text-center my-2">Multi-Criteria Decision Analysis</h1>
        <div className="text-xl text-center my-2">Analytic Hierarchical Process</div>

        <div className="text-center my-6 block">
            <Link href='/ahp-room' passHref>
                <button type="button" id="create-room" className="w-xs text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Create Decision Room
                </button>
            </Link>
            <Link href='/join-room' passHref>
                <button type="button" id="join-room" className="w-xs focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Join Room
                </button>
            </Link>
        </div>
    </>
    )
}

export default Menu