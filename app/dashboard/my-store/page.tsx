import { auth } from "@/_config/auth";
import { getField, getMyStore } from "@/_actions/controllerGlobal";
import { createAction, updateAction } from "@/_actions/formActions";
import StoreInfoForm from "@/Components/Blocks/StoreInfoForm";

export default async function MyStore() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("حدث خطأ أثناء جلب البيانات. الرجاء تحديث الصفحة أو معاودة تسجيل الدخول");
  const { myStore } = await getMyStore(session?.user?.id);
  const names = await getField("Store", "storeName");

  return (
      <StoreInfoForm store={myStore} availableNames={names} formAction={myStore ? updateAction : createAction} />
  );
}
