"use client";

import { useActionState, useEffect } from "react";
import FormSubmitButton from "../UI/Form/FormSubmitButton";
import { FormBlock } from "../UI/Form/FromBlock";
import { Label } from "../UI/Form/Label";
import { credentialsLogin } from "@/_actions/auth/credentials";
import { FormError } from "../UI/Form/FormError";

export default function LoginForm() {
  const [formState, action, isPending] = useActionState(credentialsLogin, null);

  return (
    <form action={action}>
      <FormBlock>
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <input name="email" type="email" defaultValue={formState?.rawData.email} required />
        <FormError $hasError={!!formState?.errors?.email}>{formState?.errors?.email?.[0]}</FormError>
      </FormBlock>
      <FormBlock>
        <Label htmlFor="password">كلمة المرور</Label>
        <input name="password" type="password" defaultValue={formState?.rawData.password} required />
        <FormError $hasError={!!formState?.errors?.password}>{formState?.errors?.password?.[0]}</FormError>
      </FormBlock>
      <FormSubmitButton condition={isPending} value="credentials">
        دخول
      </FormSubmitButton>
    </form>
  );
}
