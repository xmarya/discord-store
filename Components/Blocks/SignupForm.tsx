"use client"

import { credentialsSignup } from "@/_actions/auth/credentials"
import { useActionState } from "react"
import { FormError } from "../UI/Form/FormError"
import FormSubmitButton from "../UI/Form/FormSubmitButton"
import { FormBlock } from "../UI/Form/FromBlock"
import { Label } from "../UI/Form/Label"


export default function SignupForm() {
    const [formState, action, isPending] = useActionState(credentialsSignup, null);

    return (
        <form action={action}>   
            <FormBlock>
                {/* TODO: real-time email validation if exist or not */}
                <Label htmlFor="email">البريد الإلكتروني:</Label>
                <input name="email" type="text" defaultValue={formState?.rawData?.email} required/>
                <FormError $hasError={!!formState?.errors?.email}>
                    {formState?.errors?.email?.[0]}
                </FormError>
            </FormBlock>
            <FormBlock>
                <Label htmlFor="username">اسم المستخدم</Label>
                <input name="username" type="text" defaultValue={formState?.rawData?.username} required/>
                <FormError $hasError={!!formState?.errors?.username}>
                    {formState?.errors?.username?.[0]}
                </FormError>
            </FormBlock>
            <FormBlock>
                <Label htmlFor="password">كلمة المرور</Label>
                <input name="password" type="password" defaultValue={formState?.rawData?.password} required/>
                <FormError $hasError={!!formState?.errors?.password}>
                    {formState?.errors?.password?.[0]}
                </FormError>
            </FormBlock>
            <FormBlock>
                <Label htmlFor="passwordConfirm">تأكيد كلمة المرور</Label>
                <input name="passwordConfirm" type="password" defaultValue={formState?.rawData?.passwordConfirm} required/>
                <FormError $hasError={!!formState?.errors?.passwordConfirm}>
                    {formState?.errors?.passwordConfirm?.[0]}
                </FormError>
            </FormBlock>
            {/* <FormSubmitButton condition={isPending || !formState?.success}>تسجيل</FormSubmitButton> */}
            <FormSubmitButton condition={isPending}>تسجيل</FormSubmitButton>
        </form>
    )
}

