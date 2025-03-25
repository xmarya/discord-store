import { getAll } from "@/_actions/controllerGlobal";
import { SearchParams } from "@/_Types/SearchParams";
import { UserDocument } from "@/_Types/User";

export default async function AllUsers({searchParams}:SearchParams) {
    const filter = await searchParams;
    const users = await getAll<UserDocument>("User", filter);
    
    return (
        <div>
            <h1>all users page</h1>
            {
                users.map(user => 
                    <li key={user._id}>{user.username}</li>
                )
            }
        </div>
    )
}

