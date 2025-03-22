import { redirect } from "next/navigation";


export default function redirectToPage(page:string) {
    redirect("/".concat(page));
}