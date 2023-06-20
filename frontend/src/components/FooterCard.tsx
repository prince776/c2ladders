import React from 'react'

function FooterCard(props: { name: string; image: string; linkedIn: string }) {
    const { name, image, linkedIn } = props
    return (
        <a href={linkedIn} target='_blank'>
            <div className="flex flex-col justify-center max-w-xs p-3 shadow-md rounded-xl sm:px-6 dark:bg-gray-900 dark:text-gray-100">
                <img src={image} alt="User Profile" className="w-20 h-20 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y divide-gray-700">
                    <div className="my-2 space-y-1">
                        <h2 className="text-base font-semibold sm:text-base">{name}</h2>
                    </div>

                </div>
            </div>
        </a>
    )
}

export default FooterCard
