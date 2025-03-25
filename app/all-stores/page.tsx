import { getAll } from "@/_actions/controllerGlobal"
import { SearchParams } from "@/_Types/SearchParams";
import { StoreDocument } from "@/_Types/Store";

export default async function AllStores({searchParams}:SearchParams) {
    const filter = await searchParams;
    const stores = await getAll<StoreDocument>("Store", filter);
    
    return (
        <div>
            <h1>all stores page</h1>
            {
                stores.map(store =>
                    <li key={store._id}>{store.storeName}</li>
                )
            }
        </div>
    )
}

