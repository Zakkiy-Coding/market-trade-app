'use client'
import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import FooterLink from "@/components/forms/FooterLink";
import {useRouter} from "next/navigation";
import {authClient} from "@/lib/better-auth/auth-client";
import logger from "@/lib/logger";

const SignIn = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
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
        setError(null);
        try {
            const { error: authError } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (authError) {
                logger.error('Authentication failed', { 
                    email: data.email, 
                    message: authError.message 
                });
                setError(authError.message || 'Authentication failed');
                return;
            }

            logger.info('User signed in successfully', { email: data.email });
            router.push('/');
            router.refresh();
        }
        catch (err) {
            const errorInstance = err instanceof Error ? err : new Error(String(err));
            logger.error('Unexpected error during sign-in', {
                email: data.email,
                message: errorInstance.message,
                stack: errorInstance.stack
            });
            setError('An unexpected error occurred. Please try again.');
        }
    }
    return (
        <>
            <h1 className="form-title">Sign In</h1>

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-md text-sm mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="name@example.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email harus diisi',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email tidak valid'
                        }
                    }}
                />
                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Masukkan password"
                    register={register}
                    error={errors.password}
                    validation={{required: 'Password harus diisi', minLength: { value: 8, message: 'Password harus memiliki minimal 8 karakter' }}}
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
