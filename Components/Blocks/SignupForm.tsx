"use client";

import { credentialsSignup } from "@/_actions/auth/credentials";
import { useActionState } from "react";
import { InputError } from "../UI/Form/InputError";
import FormSubmitButton from "../UI/Form/FormSubmitButton";
import { FormBlock } from "../UI/Form/FromBlock";
import { Label } from "../UI/Form/Label";
import { Form } from "../UI/Form/Form";
import { FormWrapper } from "../UI/Form/FormWrapper";
import DiscordSignInButton from "./DiscordSignInButton";

export default function SignupForm() {
  const [formState, action, isPending] = useActionState(credentialsSignup, null);

  return (
    <FormWrapper>
      <Form action={action}>
        <FormBlock>
          {/* TODO: real-time email validation if exist or not */}
          <Label htmlFor="email">البريد الإلكتروني:</Label>
          <input name="email" type="email" defaultValue={formState?.rawData?.email as string} required />
          <InputError $hasError={!!formState?.errors?.email}>{formState?.errors?.email?.[0]}</InputError>
        </FormBlock>
        <FormBlock>
          <Label htmlFor="username">اسم المستخدم</Label>
          <input name="username" type="text" defaultValue={formState?.rawData?.username as string} required />
          <InputError $hasError={!!formState?.errors?.username}>{formState?.errors?.username?.[0]}</InputError>
        </FormBlock>
        <FormBlock>
          <Label htmlFor="password">كلمة المرور</Label>
          <input name="password" type="password" defaultValue={formState?.rawData?.password as string} required />
          <InputError $hasError={!!formState?.errors?.password}>{formState?.errors?.password?.[0]}</InputError>
        </FormBlock>
        <FormBlock>
          <Label htmlFor="passwordConfirm">تأكيد كلمة المرور</Label>
          <input name="passwordConfirm" type="password" defaultValue={formState?.rawData?.passwordConfirm as string} required />
          <InputError $hasError={!!formState?.errors?.passwordConfirm}>{formState?.errors?.passwordConfirm?.[0]}</InputError>
        </FormBlock>
        {/* <FormSubmitButton condition={isPending || !formState?.success}>تسجيل</FormSubmitButton> */}
        <FormSubmitButton condition={isPending}>تسجيل</FormSubmitButton>
      </Form>
      <DiscordSignInButton />
    </FormWrapper>
  );
}
