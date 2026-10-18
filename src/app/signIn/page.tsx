"use client"
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-toastify';

const SignInPage = () => {

    const handleOnSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const user = Object.fromEntries(formData.entries()) as {
            email: string;
            password: string;
        }

        const { data, error } = await authClient.signIn.email(
            {
                ...user,
                callbackURL: "/"
            }
        )

        if (data) {
            toast.success("Signed In Successfully!")
        }
        if (error) {
            toast.error("Invalid sign in!")
        }

    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });

        if (data) {
            toast.success("signed in successfully!")
        }
        else {
            toast.error("something went wrong!")
        }

    }

    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });
        if (data) {
            toast.success("signed in successfully!")
        }
        else {
            toast.error("something went wrong!")
        }


    }

    return (
        <div className="min-h-screen py-5 px-4 flex flex-col justify-center items-center">
            {/* Header Section */}
            <div className="text-center mb-6 max-w-md">
                <h2 className="font-extrabold text-2xl sm:text-3xl text-[#202820]">
                    সাইন ইন
                </h2>
                <p className="text-sm sm:text-base text-[#737c74] mt-1.5">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-md bg-white border border-[#dce6dd] rounded-2xl shadow-sm p-6 sm:p-8">
                <form onSubmit={handleOnSubmit} className="space-y-4">

                    {/*Email */}
                    <div>
                        <label className="block text-sm font-medium text-[#202820] mb-1.5">
                            ইমেইল
                        </label>
                        <input
                            type="email"
                            name='email'
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#dce6dd] text-sm text-[#202820] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#185329]/20 focus:border-[#185329] transition"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-[#202820] mb-1.5">
                            পাসওয়ার্ড
                        </label>
                        <input
                            type="password"
                            name='password'
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#dce6dd] text-sm text-[#202820] placeholder-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#185329]/20 focus:border-[#185329] transition"
                            placeholder="কমপক্ষে ৮ অক্ষর"
                            required
                        />
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 mt-2 rounded-xl bg-[#185329] hover:bg-[#134220] text-white font-medium text-sm transition shadow-sm active:scale-[0.99]"
                    >
                        সাইন ইন
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-[#dce6dd]"></div>
                    <span className="mx-3 text-xs sm:text-sm font-medium text-[#737c74]">
                        অথবা
                    </span>
                    <div className="flex-grow border-t border-[#dce6dd]"></div>
                </div>

                {/* Social Buttons (Full width stacked on mobile, side-by-side or stacked cleanly) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                        type="button"
                        className="w-full flex items-center justify-center hover: cursor-pointer gap-2 py-2.5 px-3 rounded-xl border border-[#dce6dd] bg-white hover:bg-[#f9fcf9] text-xs sm:text-sm font-medium text-[#202820] transition active:scale-[0.99]"
                        onClick={handleGoogleSignIn}
                    >
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 512 512">
                            <path d="m0 0H512V512H0" fill="#fff" />
                            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                        </svg>
                        <span className='font-extrabold'>Google দিয়ে চালিয়ে যান</span>
                    </button>

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#dce6dd] bg-white hover:bg-[#f9fcf9] text-xs sm:text-sm font-medium text-[#202820] transition active:scale-[0.99]"
                        onClick={handleGithubSignIn}
                    >
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                        </svg>
                        <span className='font-extrabold'>GitHub দিয়ে চালিয়ে যান</span>
                    </button>
                </div>

                {/* Sign In Link */}
                <p className="text-center text-xs sm:text-sm text-[#737c74] mt-6">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link
                        href="/signUp"
                        className="font-semibold text-[#185329] hover:underline"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>
            </div>

            {/* Back to Home Link */}
            <Link
                href="/"
                className="mt-6 text-xs sm:text-sm text-[#737c74] hover:text-[#202820] transition inline-flex items-center gap-1 font-medium"
            >
                ← হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default SignInPage;