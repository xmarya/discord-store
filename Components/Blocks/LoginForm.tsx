"use client";

import { useActionState, useEffect } from "react";
import FormSubmitButton from "../UI/Form/FormSubmitButton";
import { FormBlock } from "../UI/Form/FromBlock";
import { Label } from "../UI/Form/Label";
import { credentialsLogin } from "@/_actions/auth/credentials";
import { InputError } from "../UI/Form/InputError";
import { Form } from "../UI/Form/Form";
import { FormWrapper } from "../UI/Form/FormWrapper";
import DiscordSignInButton from "./DiscordSignInButton";
import Link from "next/link";

export default function LoginForm() {
  const [formState, action, isPending] = useActionState(credentialsLogin, null);

  function loginValidation() {
    
  }

  return (
    <FormWrapper>
      <Form action={action}>
        <FormBlock>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <input name="email" type="email" defaultValue={formState?.rawData.email as string} required />
          <InputError $hasError={!!formState?.errors?.email}>{formState?.errors?.email?.[0]}</InputError>
        </FormBlock>
        <FormBlock>
          <Label htmlFor="password">كلمة المرور</Label>
          <input name="password" type="password" defaultValue={formState?.rawData.password as string} required />
          <InputError $hasError={!!formState?.errors?.password}>{formState?.errors?.password?.[0]}</InputError>
        </FormBlock>
        <FormSubmitButton condition={isPending} value="credentials">
          دخول
        </FormSubmitButton>
      </Form>

      <DiscordSignInButton />

      <div style={{ marginBlock: "1.4rem" }}>
        <span style={{ color: "#ccc", fontWeight: "600", fontSize: "1.2rem" }}>لا تملك حساب؟ </span>
        <Link href="/sign-up" style={{ color: "#9b51e0" }}>
          سجّل في المنصة
        </Link>
      </div>
    </FormWrapper>
  );
}
