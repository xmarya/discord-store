import { FormFields } from "@/_Types/FormFields";

export const storeFields: Array<FormFields> = [
  {
    label: {
      text: "اسم المتجر:",
      htmlFor: "storeName",
    },
    input: {
      name: "storeName",
      placeholder: "اسم متجرك",
      type: "text",
      required: {
        required: true,
        requiredMessage: "هذا الحقل إجباري",
      },
    },
  },
];
