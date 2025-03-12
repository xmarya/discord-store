import { createStore, updateStore } from "@/actions/mutation/store";
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
  const names = await getField("Store", "storeName");

  async function createAction(prevState: void | null, formData:FormData) {
    await createStore(formData);
  }
  
  async function updateAction(prevState: void | null, formData:FormData) {
    await updateStore(myStore._id, formData);
  }
  return (
    <div>
      <StoreInfoForm store={myStore} availableNames={names} formAction={myStore ? updateAction : createAction}/>
    </div>
  );
}
