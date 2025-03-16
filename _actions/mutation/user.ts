import { withDBConnection } from "@/_utils/controllerWrapper";
import User from "@/models/userModel";

export const createUser = withDBConnection(async (newUser) => {
  console.log("before create");
  const user = await User.create({
    email: newUser.email,
    username: newUser.name,
    image: newUser.image,
    //TODO: distinguish between the sigWay methods
  });
  console.log("createNewUser🎭", user.username);
  // NOTE: I think there is no need to return the newly created usr because the signIn callback only returns boolean
  // return user;
});

export const updateUser = withDBConnection(
  async (id: string, formDate: FormData) => {
    // NOTE no need for updateUserAuth since it's related o the discord account, we only have a link with it
  }
);
