import { getField } from "@/_actions/controllerGlobal"


export async function isDuplicated(Model: "User" | "Store", field:string, value:string) {
    console.log("iside isDuplicated");
    const valuesList = await getField(Model, field);
    const result = valuesList.some((obj) => obj[field] === value);

    return result
}
/*
    [
  {
    _id: new ObjectId('67dea416406d70062346c232'),
    email: 'user@user.com',
    planExpiresInDays: 0,
    id: '67dea416406d70062346c232'
  }
]
*/