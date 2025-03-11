"use client";

import { createStore } from "@/actions/authActions";
import { FormBlock } from "@/Components/UI/Form/FromBlock";
import { Label } from "@/Components/UI/Form/Label";
import { Input } from "@/Components/UI/Form/Input";
import FormSubmitButton from "@/Components/UI/Form/FormSubmitButton";
import { StoreBasic, StoreDocument } from "@/Types/Store";
import { useForm } from "react-hook-form";
import { useActionState, useRef, useState, useTransition } from "react";
import { Button } from "@/Components/UI/Button";
import { Dialog } from "@/Components/UI/Dialog";
import FormResetButton from "../UI/Form/FormResetButton";
import toast from "react-hot-toast";
import { FormError } from "../UI/Form/FormError";


type namesObject = Pick<StoreBasic, "_id" | "storeName">;
interface Props {
  store: StoreDocument;
  availableNames:Array<namesObject>
}

export type FormState = { state: "success" | "fail"; message: string } | null;

export default function StoreInfoForm({ store, availableNames }: Props) {
  const heading = !store
    ? "ليس لديك متجر بعد. أنشئ متجرك الآن!"
    : "بيانات المتجر:";
  const { _id: storeId, storeName, categories } = store;
  const {
    register,
    setError,
    clearErrors,
    formState: { isSubmitting, isDirty, isValid ,errors: formErrors, }} = useForm({mode: "onBlur"});
  // const [state, fromAction] = useActionState<FormState, FormData>(createStore, null);
  // const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

  function checkAvailability(event:React.FocusEvent<HTMLInputElement, Element> | undefined) {
    // Guard clause 1) is it a newly created store with no name ?
    if(!storeName) return;

    // it seems to me that event.currentTarget can't be used here since it's null,
    // the data is available inside event.target (confirmed by the dev tools console).
    const userInput = event?.target.value;

    // Guard clause 2) is it empty ? 
    if(!userInput || userInput.trim() === "") {
      setError("storeName", {
        type: "custom",
        message: "لابد من إضافة اسم للمتجر"
      })
      return;
    }
    
    // Guard clause 3) did the user changed the current name to a new one ?
    if(userInput === storeName) return;

    // Guard clause 4) is the new name exist in the db names && is it associated with a different store if ?
    const isTaken = availableNames.some(obj => obj.storeName === userInput && obj._id !== storeId);
    
    isTaken ? setError("storeName", {type: "custom", message:"اسم المتجر مستخدم بالفعل"}) : setDisableSubmit(false);
  }

  return (
    <div>
      <h3>{heading}</h3>

      <form action={createStore}>
        <FormBlock>
          <Label>اسم المتجر:</Label>
          <Input
            {...register("storeName", {required: "هذا الحقل إجباري"})}
            type="text"
            maxLength={12}
            defaultValue={storeName}
            placeholder="اسم متجرك"
            required
            // onBlur={checkAvailability} throws an error of no overload
            onBlur={(event) => checkAvailability(event)}
            onClick={() => clearErrors("storeName")}
          />{" "}
          <FormError $hasError={!!formErrors?.storeName?.message}>
            {/* I had to use typeof === string to get rid of no overlap matches error */}
            {typeof formErrors?.storeName?.message === "string" ? formErrors?.storeName?.message : ""}
          </FormError>
          {
            // when the input lose the focus, a function to check if the current store name is already included in the fetched array or not
            // but how to mark the input field as an error so the form can't be submitted?
          }
        </FormBlock>
        <FormBlock>
          {/* disable the submit button in case of any error */}
          <FormSubmitButton condition={disableSubmit}>حفظ</FormSubmitButton>
          <FormResetButton>مسح</FormResetButton>
        </FormBlock>
      </form>

      <Dialog
        ref={
          dialogRef
        } /*{onSuspend={action to update the store categories and reflect the changes on the UI}}*/
      >
        <form method="dialog">
          <FormBlock>
            <Label>اسم الفئة:</Label>
            <Input {...register("categoryName-1")} type="text" />
            <Label>لون الفئة:</Label>
            <Input {...register("categoryColour-1")} type="color" />
          </FormBlock>
          <FormBlock>
            <Button formMethod="dialog" type="button" value="submit">
              حفظ
            </Button>
            <Button
              formMethod="dialog"
              type="button"
              onClick={() => dialogRef?.current?.close()}
            >
              إغلاق
            </Button>
          </FormBlock>
        </form>
      </Dialog>
    </div>
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

/*
  الحل الأول إني أفصل النموذجين
  أو أني أفصل كل بيانات في خانة منفصلة كل وحدة لها نموذجها
  أو إني أضيف فنكشن وحدة للفورم بداخلها يتم تنفيذ الأكشن حق بيانات المتجر و الثانية حقت بيانات الفئة 
  أو اضيف زرين كل واحد له onClick()
  تنفذ اكشن مختلف
*/
