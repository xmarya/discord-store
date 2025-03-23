export type StatusCode =  "valid" | "noChange" | "error";


// type FormStateResponse = {
//     success:boolean,
//     errors:Record<string, any> | null,
//     message?:string,
//     rawData?: {
//         [k: string]: FormDataEntryValue;
//     }
// }

export type ContextProps = {
    register: (name:string) => (code:StatusCode) => void,
    isFormValid:boolean,
    // formState: {
    //     success:boolean,
    //     errors:Array<{}> | null,
    //     message?:string,
    //     rawData?: {
    //         [k: string]: FormDataEntryValue;
    //     }
    // }
    // formState: void | null | FormStateResponse,
}
