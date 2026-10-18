"use client"
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { use } from 'react';
import { toast } from 'react-toastify';

const UserInfo = () => {
    const { data: session } = authClient.useSession()
    const user = session?.user
    // console.log(user)
    const router = useRouter()

    const handleSignOut = async () => {
        await authClient.signOut({
                fetchOptions:{
                onSuccess:() =>{
                    router.push("/signIn");
                    
                    router.refresh()
                    toast.success("signed out successfully!")
                }
            }
            });
    }
    return (
        <div>
            {
                user ? (<div>


                    <ul className="menu rounded-box">
                        <li>
                            <details>
                                <summary className='flex gap-2 items-center'>
                                    <div className="avatar">
                                        <div className="w-13 h-13 rounded-full">
                                            <Image width={13} height={13} alt={user?.name || "Tailwind-CSS-Avatar-component"}
                                                src={user?.image || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"}
                                                onError={(e) => {
                                                    // If the link is broken, replace it with default image
                                                    e.currentTarget.src = "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp";
                                                }} />
                                        </div>
                                    </div>
                                    <h2>{user?.name}</h2>
                                </summary>
                                <ul>
                                    <li>
                                        <Link href={"/profile"} className='font-semibold text-black'>
                                            প্রোফাইল
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className='font-semibold text-black border-0'>সাইন আউট</button>
                                    </li>
                                </ul>
                            </details>

                        </li>
                    </ul>





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