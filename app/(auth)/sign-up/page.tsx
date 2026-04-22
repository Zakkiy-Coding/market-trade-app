'use client'
import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constans";
import {CountrySelectField} from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    })
    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data)
        }
        catch (error) {
            console.error( error)
        }
    }
    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Nama Lengkap"
                    placeholder="Zakkiy"
                    register={register}
                    error={errors.fullName}
                    validation={{required: 'Nama lengkap harus diisi', minLength: 2}}
                />
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
                <CountrySelectField
                    name="country"
                    label="Negara"
                    control={control}
                    error={errors.country}
                    required
                />
                <SelectField
                    name="investmentGoals"
                    label="Tujuan Investasi"
                    placeholder="Pilih tujuan investasi"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />
                <SelectField
                  name="riskTolerance"
                  label="Toleransi Risiko"
                  placeholder="Pilih toleransi risiko"
                  options={RISK_TOLERANCE_OPTIONS}
                  control={control}
                  error={errors.riskTolerance}
                  required
                />
                <SelectField
                  name="preferredIndustry"
                  label="Industri yang disukai"
                  placeholder="Pilih industri yang disukai"
                  options={PREFERRED_INDUSTRIES}
                  control={control}
                  error={errors.preferredIndustry}
                  required
                />
                <FooterLink text="Sudah punya akun?" linkText="Sign in" href="/sign-in" />
                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    { isSubmitting ? 'Membuat Akun' : 'Mulai perjalanan Investasi kamu'}
                </Button>
            </form>
        </>
    )
}
export default SignUp
