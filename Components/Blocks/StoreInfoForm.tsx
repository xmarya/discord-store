"use client";

import { StoreDocument } from "@/_Types/Store";
import { FormContextProvider } from "@/hooks/FormContext";
import StoreNameInput from "./StoreNameInput";
import StoreCategoryInput from "./StoreCategoryInput";
import StoreLogoInput from "./StoreLogoInput";
import Link from "next/link";

type namesObject = Pick<StoreDocument, "_id" | "storeName">;
type Props = {
  store: StoreDocument;
  formAction: (prevState: void | null, formData: FormData) => Promise<void>;
};

export default function StoreInfoForm({ store, formAction }: Props) {
  const { _id: storeId, storeName, logo } = store || "";

  return (
    <>
        <Link href="/dashboard">عودة للوحة التحكم</Link>

      <FormContextProvider formAction={formAction}>
        <StoreNameInput storeName={storeName} storeId={storeId}/>
        <StoreLogoInput logo={logo} />
        {storeId && (
          <>
            {/* <StoreCategoryInput categories={categories} storeId={storeId} /> */}
            <input type="hidden" defaultValue={storeId} name="storeId" />
          </>
        )}
      </FormContextProvider>

    </>
  );
}
