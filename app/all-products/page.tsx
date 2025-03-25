import { getAll } from "@/_actions/controllerGlobal";
import { ProductDocument } from "@/_Types/Product";
import { SearchParams } from "@/_Types/SearchParams";

export default async function AllProducts({searchParams}:SearchParams) {
    const filter = await searchParams;
    const products = await getAll<ProductDocument>("Product", filter);
    
    return (
        <div>
            <h1>all products page</h1>
            {
                products.map(prod => 
                    <li key={prod._id}>{prod.name}</li>
                )
            }
        </div>
    )
}

