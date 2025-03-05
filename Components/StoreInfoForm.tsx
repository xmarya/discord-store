"use client";

import { createStore } from "@/actions/authActions";

interface Props {
  store: any;
  // userId: string;
}

export default function StoreInfoForm({ store }: Props) {
  const heading = !store
    ? "ليس لديك متجر بعد. أنشئ متجرك الآن!"
    : "بيانات المتجر:";

  return (
    <div>
      <h3>{heading}</h3>
      <form action={createStore}>
        <div>
          <label>اسم المتجر:</label>
          <input
            name="storeName"
            type="text"
            maxLength={12}
            defaultValue={store?.storeName || ""}
            placeholder="اسم متجرك"
            required
          />
        </div>
        {/* <input name="userId" type="hidden" value={userId} /> */}
        <div>
          <button type="submit">حفظ</button>
          <button type="reset">مسح</button>
        </div>
      </form>
    </div>
  );
}
