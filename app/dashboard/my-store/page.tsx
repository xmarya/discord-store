import StoreCategoriesForm from "@/Components/Blocks/StoreCategoriesForm";
import StoreInfoForm from "@/Components/Blocks/StoreInfoForm";
import { auth } from "@/config/auth";
import { getField, getMyStore } from "@/controllers/controllerGlobal";

export default async function MyStore() {
  const session = await auth();
  if (!session?.user?.id)
    throw new Error(
      "حدث خطأ أثناء جلب البيانات. الرجاء تحديث الصفحة أو معاودة تسجيل الدخول"
    );
  const {myStore} = await getMyStore(session?.user?.id);
  // console.log(myStore);
  const names = await getField("Store", "storeName");
  return (
    <div>
      <StoreInfoForm store={myStore} availableNames={names} />
      {/* <StoreCategoriesForm categories={myStore.categories}/> */}
    </div>
  );
}
