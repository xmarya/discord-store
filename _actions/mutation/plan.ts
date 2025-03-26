"use server";

import { withDBConnection } from "@/_utils/controllerWrapper";
import Plan from "@/models/planModel";

export const updatePlan = withDBConnection(async (prevState: any, formData: FormData) => {
  const inputs = Object.fromEntries(formData.entries());

  await Plan.findByIdAndUpdate(inputs?.planId, {
    ...inputs
  });
});
