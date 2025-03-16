"use client"
import { FormContext } from "@/hooks/FormContext";
import { use, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FormError } from "./FormError";
import { FormContextInput, FormContextValue } from "@/_Types/FormContextInput";

const StyledInput = styled.input`
  height: 2.5rem;
  width: 100%;
  padding-bottom: 1rem;
  padding-inline: 0.5rem;
`;


export default function Input({name, eventType, validate, ...props}:FormContextInput) {
  const {register} = use(FormContext);
  const [error, setError] = useState<string>("");
  const validateFuncRef = useRef<Function>(() => {});

  

  useEffect(() => {
      const validateFunc = register(name);
      validateFuncRef.current = validateFunc;

      // this is a CLEAN-UP not an initialisation. 
      // it reset the the validity when the component unmount/input's name changed.
      return () => validateFunc(false);
  },[name]); // re-triggers when only the input's name changed
  /* OLD CODE (kept for reference): 
    },[name,register]); // ❌ registerInput in dependencies causes infinite validity resets
  */  

  async function handleValidate(event) {
    try {
      await Promise.resolve(validate(event));
      setError(""); // if the validate(event) doesn't produce ne error this line will be reached and the error will be set to "" which means the validation is good.
      validateFuncRef.current(true); // remember! the current here is a FUNCTION, that is why the braces are used.
    } catch (error) {
      setError((error as Error).message);
      validateFuncRef.current(false);
    }

  }

  return (
    <>
      <StyledInput name={name} {...props}
      {...(eventType === "onBlur" && {onBlur:handleValidate})}
      {...(eventType === "onKeyDown" && {onKeyDown:handleValidate})}
      />
      <FormError $hasError={!!error}>
        {error}
      </FormError>
    </>    
  )
}


