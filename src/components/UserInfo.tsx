"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React, { use } from 'react';

const UserInfo = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    // console.log(user)

    const handleSignOut = async () => {
        await authClient.signOut();
    }
    return (
        <div>
            {
                user ? (<div>
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind-CSS-Avatar-component"
                                src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                        </div>
                    </div>
                    <h2>{user?.name}</h2>
                    <button onClick={handleSignOut} className='btn mx-1.5 bg-green-500 text-white'>সাইন আউট</button>

                </div>
                )
                    :
                    (<div>
                        <Link href={"/signIn"}>
                            <button className="btn border-0">সাইন ইন</button>
                        </Link>
                        <Link href={"/signUp"}>
                            <button className="btn btn-success mx-1.5 text-white">সাইন আপ</button>
                        </Link>
                    </div>)}
        </div>
    );
};

export default UserInfo;