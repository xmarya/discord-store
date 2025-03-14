"use client";

import FormSubmitButton from "@/Components/UI/Form/FormSubmitButton";
import { FormBlock } from "@/Components/UI/Form/FromBlock";
import { Input } from "@/Components/UI/Form/Input";
import { Label } from "@/Components/UI/Form/Label";
import { storeFields } from "@/_data/storeFormFields";
import { StoreBasic, StoreDocument } from "@/Types/Store";
import { useActionState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "../UI/Form/Form";
import { FormError } from "../UI/Form/FormError";
import FormResetButton from "../UI/Form/FormResetButton";
import { useFormStore } from "@/hooks/formStore";
import TagsInput from "./TagsInput";

type namesObject = Pick<StoreBasic, "_id" | "storeName">;
interface Props {
  store: StoreDocument;
  availableNames: Array<namesObject>;
  formAction: (prevState: void | null, formData: FormData) => Promise<void>;
}

export default function StoreInfoForm({ store,availableNames,formAction}: Props) {
  const {_id:storeId, storeName, categories} = store || "";

  const methods = useForm({ mode: "onBlur" });
  const {
    register,
    setError,
    clearErrors,
    formState: { errors: formErrors }} = methods;

  /* OLD CODE (kept for reference): 
  this handlre to solve the no overload problem because any action that is being passed to useActionState MUST accept the preState (prevState: void | null) as the first argument
  // const actionHandler = async (_: void | null, formData: FormData) => {
    //   await formAction(formData);
    // };
    */
  const [formState, action, isPending] = useActionState(formAction, null);

  const {setHasError, dirtyForm, setStoreData, storeData} = useFormStore();
  console.log("dirtyForm", dirtyForm);

  function checkAvailability(event: React.FocusEvent<HTMLInputElement, Element> | undefined) {

    // Reset the state to disable the button:
    setHasError(true);

    // Guard clause 1) is it a newly created store with no name ?
    // if (!storeName) return; // if this guard stays, then since the store is new,
    // whatever the userInput would be it won't go through the other guards to be checked correctly.

    // it seems to me that event.currentTarget can't be used here since it's null,
    // the data is available inside event.target (confirmed by the dev tools console).
    const userInput = event?.target.value;

    // Guard clause 2) is it empty ?
    if (!userInput || userInput.trim() === "") {
      setError("storeName", {
        type: "custom",
        message: "لابد من إضافة اسم للمتجر",
      });
      return;
    }

    // Guard clause 3) did the user changed the current name to a new one ?
    if (userInput === storeName) return;

    // Guard clause 4) is the new name exist in the db names && is it associated with a different store if ?
    const isTaken = availableNames.some(
      (obj) => obj.storeName === userInput && obj._id !== storeId
    );

    isTaken
      ? setError("storeName", {
          type: "custom",
          message: "اسم المتجر مستخدم بالفعل",
        })
      : setHasError(false);

  }

  return (
    <FormProvider {...methods}>

    <Form action={action}>
      {storeId && <Input type="hidden" defaultValue={storeId} name="storeId"/>}

      {storeFields.map(({ label, input }, index) => (
        <FormBlock key={index}>
          <Label htmlFor={label.htmlFor}>{label.text}</Label>
          <Input
            {...register(
              input.name,
              input.required && {
                required: input.required.requiredMessage,
              }
            )}
            type={input.type}
            defaultValue={storeName}
            placeholder={input.placeholder}
            // onBlur={checkAvailability} throws an error of no overload
            onBlur={(event) => checkAvailability(event)}
            onClick={() => clearErrors(input.name)}
            />{" "}
          <FormError $hasError={!!formErrors?.storeName?.message}>
            {/* I had to use typeof === string to get rid of no overlap matches error */}
            {typeof formErrors?.storeName?.message === "string"
              ? formErrors?.storeName?.message
              : ""}
          </FormError>
        </FormBlock>
      ))}
      <TagsInput tags={categories} getTagValue={cat => cat.name}/>
      <FormSubmitButton condition={dirtyForm}>
        {isPending ? "جاري الحفظ..." : "حفظ"}
      </FormSubmitButton>
      <FormResetButton aria-disabled={isPending}>مسح</FormResetButton>
    </Form>
      </FormProvider>
  );
}

//NOTE: use react-hook-form to make the creating and controlling the form a lot easier,
// but for handling the submitting we're NOT gonna use react-form's handleSubmit,
//instead, we're gonna use the from action and React's useActionState hook to handle
// the form data and showing loading indicator.
// reference => https://nehalist.io/react-hook-form-with-nextjs-server-actions/
// ALSO, it is important to know that, whatever the action we use React's useActionState hook
// IT MUST accept the previous state as the first argument and the form data as the second argument
// reference => https://www.pronextjs.dev/form-actions-with-the-useformstate-hook

// what is the difference between a button with type="submit" and a button with value="submit" ?
// type="submit" submits the form. value="submit" is just data that can be sent when the form is submitted.
// Also,the button with value="submit" does not submit the form but is likely used inside a <dialog> element,
// where it closes the dialog and sends back the from data.