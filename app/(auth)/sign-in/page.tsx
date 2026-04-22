'use client'
import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    })
    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log(data)
        }
        catch (error) {
            console.error( error)
        }
    }
    return (
        <>
            <h1 className="form-title">Sign In</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="zakkiycod@gmail.com"
                    register={register}
                    error={errors.email}
                    validation={{required: 'Email harus diisi', pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email tidak valid'}}
                />
                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Masukkan password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'Password harus diisi', minLength: 8, message: 'Password harus memiliki minimal 8 karakter'}}
                />
                <FooterLink text="Belum punya akun?" linkText="Sign up" href="/sign-up" />
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    { isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>
        </>
    )
}
export default SignIn
