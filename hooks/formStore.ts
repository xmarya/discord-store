import {create} from "zustand";

// general store for forms states
// export type Form = {
//     validForm:boolean, // for the two forms
// }
// export type State = {
//     allowSubmit:boolean, // for the button
//     // validForm:boolean, // for the two forms
// }

export type StoreState = {
    dirtyForm:boolean,
    setHasError: (hasError:boolean) => void,
}

export const useFormStore = create<StoreState>((set) => ({
    dirtyForm:true,
    setHasError: (hasError:boolean) => set((currentState) => ({
        ...currentState,
        dirtyForm: hasError ? true : false
    }) ),
}));

