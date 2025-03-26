import { auth } from "@/_config/auth";
import { withDBConnection } from "@/_utils/controllerWrapper";
import { UpdateUserProfileSchema } from "@/_utils/ZodValidations/userSchema";
import User from "@/models/userModel";


export const updateUser = withDBConnection( async (prevData:any, formDate: FormData) => {
  // NOTE this action is only for credentials user
  const inputs = Object.fromEntries(formDate);
  const validation = UpdateUserProfileSchema.safeParse(inputs);
  if(!validation.success) return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
    rawData: inputs
  }
  const session = await auth();
  const userId = session?.user.id;
  await User.findByIdAndUpdate(userId, {
    ...inputs
  });
});

export const changePassword = withDBConnection( async(prevData:any, formData:FormData) => {
  const inputs = Object.fromEntries(formData);

  const validation = UpdateUserProfileSchema.safeParse(inputs);
  if(!validation.success) return {
    success: false,
    errors: validation.error.flatten().fieldErrors,
    rawData: inputs
  }

  const session = await auth();
  const userId = session?.user.id;

  await User.findByIdAndUpdate(userId, {
    credentials : {password: inputs.password}
  });
});
