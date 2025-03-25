"use client";
import { FormContext } from "@/hooks/FormContext";
import { use, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { EventTypes, EventTypesMap, FormContextInput } from "@/_Types/FormContextInput";
import { InputError } from "./InputError";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;
const StyledInput = styled.input``;

export default function Input<T extends EventTypes>({ name, eventType, validate, ...props }: FormContextInput<T>) {
  const { register } = use(FormContext);
  const [error, setError] = useState<string>("");
  const validateFuncRef = useRef<Function>(() => {});

  useEffect(() => {
    const validateFunc = register(name);
    validateFuncRef.current = validateFunc;

    console.log("input " + name + " re-render");

    // this is a CLEAN-UP not an initialisation.
    // it reset the the validity when the component unmount/input's name changed.
    return () => validateFunc("noChange");
  }, [name]); // re-triggers when only the input's name changed
  /* OLD CODE (kept for reference): 
    },[name,register]); // ❌ registerInput in dependencies causes infinite validity resets
  */

  async function handleValidate(event: EventTypesMap[T]) {
    // try {
      const result = await Promise.resolve(validate(event));
      // setError(""); // if the validate(event) doesn't produce ne error this line will be reached and the error will be set to "" which means the validation is good.
      validateFuncRef.current(result.code); // remember! the current here is a FUNCTION, that is why the braces are used.
      if(!result.success) {
        const message = Object.values(result.errors);
        setError(message.flat()[0]);
        return;
      }
      setError("")
    // } catch (error) {
    //   // setError((error as Error).message);
    //   validateFuncRef.current("error");
    // }
  }

  return (
    <InputWrapper>
      <StyledInput
        name={name}
        {...props}
        // {...(eventType === "onBlur" && {onBlur:handleValidate})}
        // {...(eventType === "onKeyDown" && {onKeyDown:handleValidate})}
        {...{ [eventType]: handleValidate }} // Dynamic prop assignment
        // The inner {} creates an object with a computed property name,
        // The outer {} spreads object into the JSX element.
      />
      <InputError $hasError={!!error}>{error}</InputError>
    </InputWrapper>
  );
}
