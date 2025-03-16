"use server"

import { createStore, updateStore } from "./mutation/store";

export async function createAction(prevState: void | null, formData: FormData) {
    await createStore(formData);
  }

export async function updateAction(prevState: void | null, formData: FormData) {
  console.log("updateAction",formData);
  // STEP 1) if there is a new/changed category, add/update it in the db along with the storeId
    // await updateStore(formData);
  }