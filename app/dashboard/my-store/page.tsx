import { auth } from "@/_config/auth";
import { getField, getMyStore } from "@/_actions/controllerGlobal";
import StoreInfoForm from "@/Components/Blocks/StoreInfoForm";
import { createStore, updateStore } from "@/_actions/mutation/store";

export default async function MyStore() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("حدث خطأ أثناء جلب البيانات. الرجاء تحديث الصفحة أو معاودة تسجيل الدخول");
  const { myStore } = await getMyStore(session?.user?.id);

  return (
      <StoreInfoForm store={myStore} formAction={myStore ? updateStore : createStore} />
  );
}
