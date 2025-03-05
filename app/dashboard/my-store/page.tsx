
import StoreInfoForm from "@/Components/StoreInfoForm";
import { auth } from "@/config/auth";
import { getMyStore } from "@/controllers/controllerGlobal";

export default async function MyStore() {
  const session = await auth();
  if (!session?.user?.id)
    throw new Error(
      "حدث خطأ أثناء جلب البيانات. الرجاء تحديث الصفحة أو معاودة تسجيل الدخول"
    );
  const myStore = await getMyStore(session?.user?.id);
  return (
    <div>
        <StoreInfoForm store={myStore}/>
    </div>
  );
}
