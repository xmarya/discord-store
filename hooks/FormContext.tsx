"use client";

import { ContextProps } from "@/_Types/FormContext";
import { InputStatusCode } from "@/_Types/FormContextInput";
import { Form } from "@/Components/UI/Form/Form";
import FormResetButton from "@/Components/UI/Form/FormResetButton";
import FormSubmitButton from "@/Components/UI/Form/FormSubmitButton";
import { createContext, useActionState, useRef, useState } from "react";

type Props = {
  // children:React.ReactNode | Iterable<React.ReactNode>,
  children: any;
  formAction: (prevState: any, formData: FormData) => Promise<void>;
  // Form?:FunctionComponent,
};
const FormContext = createContext<ContextProps>({
  register: () => () => {},
  isFormValid: false,
});

function FormContextProvider({ children, formAction }: Props) {
  const inputsValidStatus = useRef<Record<string, InputStatusCode>>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [formState, action, isPending] = useActionState(formAction, null);

  function checkStatus(code: InputStatusCode, inputs: Record<string, InputStatusCode>) {
    return Object.values(inputs).some((status) => status === code);
  }

  function checkValidity() {
    /* OLD CODE (kept for reference): 
            // Another approach => !Object.values(inputsValidStatus.current).includes(false);
            // const isValid = Object.values(inputsValidStatus.current).every(Boolean);
            // the condition of .every() here is the built-in Function Boolean. it returns true/false depending on all the values inside Object.values(inputsValidStatus.current)
        */

    //STEP: 1) check if there is an error first. if there, set the form and return early.
    const formHasError = checkStatus("error", inputsValidStatus.current);

    if (formHasError) {
      setIsFormValid(false); // make sure the form is RESET to be false.
      // in case I just returned without setIsFormValid(false);
      // the previous state which it maybe true will allow submission to the back-end.
      return; // early return.
    }

    //STEP: 2) since no error, check if one of them is valid or they all unchanged:
    const formHasValid = checkStatus("valid", inputsValidStatus.current);

    //STEP: 3) isFormValid = true,
    setIsFormValid(formHasValid);
  }

  // the job of this functions is:
  // STEP 1) the input want to register in the context provides its name
  // STEP 2) the function takes the name => insert it in the Record<string, boolean> with initial status as false
  // STEP 3) returns a new function for the newly registered input to pass in its status whenever it changed in the future to get validated.
  function register(name: string) {
    // set the input valid state = false once it's registered
    inputsValidStatus.current[name] = "noChange";

    return (code: InputStatusCode) => {
      inputsValidStatus.current[name] = code;
      console.log("return (code:InputStatusCode) =>  inputsValidStatus", inputsValidStatus);
      checkValidity();
    };
  }

  return (
    <FormContext value={{ register, isFormValid }}>
      <Form action={action} onSubmit={() => setIsFormValid(false)}>
        {children}
        <FormSubmitButton condition={!isFormValid}>{isPending ? "جاري الحفظ..." : "حفظ"}</FormSubmitButton>
        <FormResetButton onClick={() => setIsFormValid(false)} aria-disabled={isPending}>
          مسح
        </FormResetButton>
      </Form>
    </FormContext>
  );
}

export { FormContext, FormContextProvider };
