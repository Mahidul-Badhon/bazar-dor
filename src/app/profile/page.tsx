"use client"
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const ProfilePage = () => {
    const {data: session} = authClient.useSession()
    const user = session?.user
    // console.log(user)

    const router = useRouter()

    const handleOnSubmit = async(e:React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const newUserData = Object.fromEntries(formData.
            entries()) as {name: string}

        await authClient.updateUser({
            ...newUserData
        })
    }

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
            <div className="mt-5 py-5 px-4 flex flex-col justify-center items-center">
            {/* Header Section */}
            <div className="text-center mb-6 max-w-md">
                <h2 className="font-extrabold text-2xl sm:text-3xl text-[#202820]">
                    আমার প্রোফাইল
                </h2>
                <p className="text-sm sm:text-base text-[#737c74] mt-1.5">
                    আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                </p>
            </div>

            {/* user details section */}
            <section className='w-full lg:max-w-3xl max-w-md flex justify-between items-center p-3 bg-white mt-2 py-6 px-7 mb-3 rounded-2xl'>
                {/* for profile info */}
                <div className='flex items-center gap-4'>
                    <div>
                        <Image width={60} height={60} 
                        src={user?.image || "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"} 
                        alt={user?.name || "User Avater"}
                        className='rounded-3xl'/>
                    </div>
                    <div>
                        <h2 className='font-extrabold text-2xl'>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </div>
                </div>

                {/* button */}
                <div>
                    <button onClick={handleSignOut} className='border border-red-500 text-red-600 p-3 rounded-2xl'>↩ সাইন আউট</button>
                </div>
            </section>

            {/* Form Card */}
            <div className="w-full lg:max-w-3xl max-w-md bg-white border border-[#dce6dd] rounded-2xl shadow-sm p-6 sm:p-8">
                <form onSubmit={handleOnSubmit} className="space-y-4">

                    <div>
                        <label className="block text-sm font-medium text-[#202820] mb-1.5">
                            নাম
                        </label>
                        <input
                            type="text"
                            name='name'
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#dce6dd] text-sm text-[#202820] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#185329]/20 focus:border-[#185329] transition"
                            placeholder="যেমন: রহিম উদ্দিন"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 mt-2 rounded-xl bg-[#185329] hover:bg-[#134220] text-white font-medium text-sm transition shadow-sm active:scale-[0.99]"
                    >
                        আপডেট
                    </button>
                </form>


            </div>

        </div>
        </div>
    );
};

export default ProfilePage;