"use client"

import { Form } from "@/Components/UI/Form/Form"
import FormResetButton from "@/Components/UI/Form/FormResetButton"
import FormSubmitButton from "@/Components/UI/Form/FormSubmitButton"
import { createContext, useActionState, useRef, useState } from "react"


type ContextProps = {
    register: (name:string) => (isValid:boolean) => void,
    isFormValid:boolean,
}

type Props = {
    // children:React.ReactNode | Iterable<React.ReactNode>,
    children:any,
    formAction: (prevState:any, formData:FormData) => Promise<void>
    // Form?:FunctionComponent,
}

const FormContext = createContext<ContextProps>({
    register: () => () => {},
    isFormValid:false,
});

function FormContextProvider({children, formAction}:Props) {
    const inputsValidStatus = useRef<Record<string, boolean>>({});
    const [isFormValid, setIsFormValid] = useState(false);
    const [formState, action, isPending] = useActionState(formAction, null);
    console.log("context", formAction);

    function checkValidity() {
        // Another approach => !Object.values(inputsValidStatus.current).includes(false);
        const isValid = Object.values(inputsValidStatus.current).every(Boolean);
        // the condition of .every() here is the built-in Function Boolean. it returns true/false depending on all the values inside Object.values(inputsValidStatus.current)
        console.log("checkValidity before setIsFormValid", isFormValid);
        setIsFormValid(isValid);

        console.log("checkValidity isValid", isValid);
        console.log("checkValidity isFormValid", isFormValid);
    }

    // the job of this functions is: 
    // STEP 1) the input want to register in the context provides its name
    // STEP 2) the function takes the name => insert it in the Record<string, boolean> with initial status as false
    // STEP 3) returns a new function for the newly registered input to pass in its status whenever it changed in the future to get validated.
    function register(name:string) {
        // set the input valid state = false once it's registered
        inputsValidStatus.current[name] = false;

        return (isValid:boolean) => {
            console.log("inside register return function", isValid);
            inputsValidStatus.current[name] = isValid;
            checkValidity();
        }
    }

    return (
        <FormContext value={{register, isFormValid}}>
            <Form action={action}>
                {children}
                <FormSubmitButton condition={!isFormValid}>{isPending ? "جاري الحفظ..." : "حفظ"}</FormSubmitButton>
                <FormResetButton aria-disabled={isPending}>مسح</FormResetButton>
            </Form>
        </FormContext>
    )
}

export { FormContext, FormContextProvider }

