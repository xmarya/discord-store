"use client";
import { StoreSchema } from "@/_utils/ZodValidations/StoreSchema";
import { FormBlock } from "../UI/Form/FromBlock";
import Input from "../UI/Form/Input";
import { Label } from "../UI/Form/Label";

type Props = {
  storeName: string;
  storeId: string;
};

export default function StoreNameInput({ storeName, storeId }: Props) {
  async function checkAvailability(event: React.FocusEvent<HTMLInputElement>): Promise<any> {
    // Reset the state to disable the button:

    // Guard clause 1) is it a newly created store with no name ?
    // if (!storeName) return; // if this guard stays, then since the store is new,
    // whatever the userInput would be, it won't go through the other guards to be checked correctly.

    // it seems to me that event.currentTarget can't be used here since it's null,
    // the data is available inside event.target (confirmed by the dev tools console).
    const userInput = event?.target.value;

    // Guard clause 3) did the user changed the current name to a new one ?
    // TODO: this should be the 1st condition
    if (userInput === storeName)
      return {
        success: true,
        code: "noChange",
      };

    const validation = await StoreSchema(storeId as string).safeParseAsync({ storeName: userInput });

    if (!validation.success)
      return {
        success: false,
        code: "error",
        experimentalError: validation.error.flatten().fieldErrors,
        errors: validation.error.flatten().fieldErrors,
        rawData: { userInput },
      };
    // Guard clause 2) is it empty ?
    // if (!userInput || userInput.trim() === "") {
    //   throw new Error("لابد من إضافة اسم للمتجر");
    // }

    // Guard clause 4) is the new name has special characters or all-are-numbers => ^(?!\d+$)[\p{L}\p{N} ]+$ ?
    // const regex = new RegExp("^(?!d+$)[p{L}p{N} ]+$");
    // if (!regex.test(userInput)) throw new Error("يجب أن يحتوي الاسم على أحرف وأرقام فقط");

    // Guard clause 5) is the new name exist in the db names && is it associated with a different store if ?
    // const isTaken = availableNames.some((obj) => obj.storeName === userInput && obj._id !== storeId);
    // const isTaken = await isDuplicated("Store", "storeName", userInput, storeId);

    // if (isTaken) throw new Error("اسم المتجر مستخدم بالفعل");

    return {
      success: true,
      code: "valid",
    };
  }

  return (
    <FormBlock>
      <Label htmlFor="storeName">اسم المتجر:</Label>
      <Input name="storeName" eventType="onBlur" type="text" placeholder="اسم متجرك" defaultValue={storeName} validate={checkAvailability} required />
    </FormBlock>
  );
}
