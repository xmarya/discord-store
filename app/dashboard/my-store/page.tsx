import { createStore, updateStore } from "@/_actions/mutation/store";
import StoreCategoriesForm from "@/Components/Blocks/StoreCategoriesForm";
import StoreInfoForm from "@/Components/Blocks/StoreInfoForm";
import { auth } from "@/_config/auth";
import { getField, getMyStore } from "@/_actions/controllerGlobal";
import { createAction, updateAction } from "@/_actions/formActions";

export default async function MyStore() {
  const session = await auth();
  if (!session?.user?.id)
    throw new Error(
      "حدث خطأ أثناء جلب البيانات. الرجاء تحديث الصفحة أو معاودة تسجيل الدخول"
    );
  const { myStore } = await getMyStore(session?.user?.id);
  const names = await getField("Store", "storeName");

  return (
    <div>
      <StoreInfoForm
        store={myStore}
        availableNames={names}
        formAction={myStore ? updateAction : createAction}
      />
    </div>
  );
}
