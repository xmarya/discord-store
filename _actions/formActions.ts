"use server"

import { createStore, updateStore } from "./mutation/store";

export async function createAction(prevState: void | null, formData: FormData) {
    await createStore(formData);
  }

export async function updateAction(prevState: void | null, formData: FormData) {
    await updateStore(formData);
  }