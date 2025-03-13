import { withDBConnection } from "@/_utils/controllerWrapper";
import { CategoryBasic } from "@/Types/Category";

export const createCategory = withDBConnection(
  async (category: CategoryBasic, storeId: string) => {
    // const session = await auth(); no need to fetch the userId => getUser(id) => get the storeId
  }
);
