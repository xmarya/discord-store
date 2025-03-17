export type StatusCode =  "valid" | "noChange" | "error";

export type ContextProps = {
    register: (name:string) => (code:StatusCode) => void,
    isFormValid:boolean,
}
