import { StoreDocument } from "@/Types/Store";
import {create} from "zustand";


export type StoreState = {
    storeData:Partial<StoreDocument> | null,
    dirtyForm:boolean,
    setHasError: (hasError:boolean) => void,
    setStoreData:(fromData:FormData) => void
}

export const useFormStore = create<StoreState>((set) => ({
    storeData:null,
    dirtyForm:true,
    setStoreData: (formData:FormData) => set( (currentState) => ({
       storeData: {
        ...currentState.storeData,
        formData
       }
    })),
    setHasError: (hasError:boolean) => set((currentState) => ({
        ...currentState,
        dirtyForm: hasError ? true : false
    }),
),
}));

