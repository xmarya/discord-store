/*
NOTE: This is where you can control the behaviour of the library 
and specify custom authentication logic, adapters, etc.
*/

import NextAuth, { type DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import { getUser } from "@/_actions/controllerGlobal";
import { createUser } from "@/_actions/mutation/user";

// By default, the `id` property does not exist on `session` of async session({ session, user})
// See the [TypeScript](https://authjs.dev/getting-started/typescript) on how to add it.
declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface Session {
    user: {
      id: string; // `session.user.id` is now a valid property, and will be type-checked
      // in places like `useSession().data.user` or `auth().user`
      userType: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

const authConfig = NextAuth({
  providers: [Discord],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // NOTE: the callbacks are the app middlewares

    authorized: async ({ auth: currentSession, request }) => {
      return !!currentSession?.user;
      // authorized() callback check whether the user is authorised or not
      // before give the access to the protected routes by returning false or true
    },

    async signIn({ user }) {
      console.log("SIGNIN CALLBACK 🔎");
      try {
        if (typeof user.email !== "string") return false; // to solve => Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'.
        // 1) look up for the sam email in the db
        const isExist = await getUser(user.email);
        // console.log("isExist", isExist, isExist.length === 0);
        //TODO: if not exist => forward the user to the plan page to select one and pay for it then create a new user

        /* OLD CODE (kept for reference): 
          if (!isExist) await createNewUser(user);
          the statement above was not work since the getUser() return an empty array [].
          in javascript [] and {} are falsy but non-nullish value
          if course !isExist prints false bu the if condition behaves differently:
          if (!isExist) is effectively if (![]), which does not trigger because [] is a truthy value.
          the syntax !isExist ONLY WORKS with undefined and null
        */

        // 2) if not exist then create a new user
        if (isExist.length === 0) await createUser(user);
        return true;
      } catch (error) {
        return false;
        // NOTE: this md only returns boolean, that'w why I can't throw any error here,
        // handle any error where this md was called (inside the authActions.ts).
      }
    },
    async session({ session }) {
      console.log("SESSION CALLBACK ⏳");
      const currentUser = await getUser(session?.user.email);
      // console.log("currentUser🔴", currentUser, typeof currentUser);

      // 1) adding the role and the id to the session info:
      session.user.id = currentUser[0]._id;
      session.user.userType = currentUser[0].userType;
      // console.log("⏳⏳⏳",session);

      // console.log("the working session FINALLY", session);
      return session;
    },
  },

  /*NOTE:
        I face a problem where the app took me directly to the auth.js default page to login using discord
        and didn't show the home page either the login page with the button of discord I created
        THE SOLUTION was specifying the pages object to tell what page we want the auth.js to use.
        I still don't see how this solved the problem I faced! because defining the pages object
        just OVERWRITE the default page auth.js provides
        OH YES! the problem rise from the fact that I didn't specify and matchers in the middleware.ts
        so the auth middleware that is imported inside middleware.ts was working for all the app routers

    */
  pages: {
    signIn: "/login",
  },
});

// NOTE: the auth we're exported here, its is what we're going to call in different places
//      throughout the code to get the session's info
export const { auth, handlers, signIn, signOut } = authConfig;

/**
 * auth signin -user: {
  id: 'c2205d8d-2e31-48cf-aae5-934b834bc25c',
  name: 'Marya',
  email: 'missmeme1416@hotmail.com',
  image: 'https://cdn.discordapp.com/embed/avatars/1.png'
}
auth signin -profile: {    
  id: '631460480514261012',
  username: 'marya5669',   
  avatar: null,
  discriminator: '0',      
  public_flags: 0,
  flags: 0,
  banner: null,
  accent_color: null,
  global_name: 'Marya',
  avatar_decoration_data: null,
  banner_color: null,
  clan: null,
  primary_guild: null,
  mfa_enabled: false,
  locale: 'en-GB',
  premium_type: 0,
  email: 'missmeme1416@hotmail.com',
  verified: true,
  image_url: 'https://cdn.discordapp.com/embed/avatars/1.png'
}
auth signin -account: {
  token_type: 'bearer',
  access_token: 'TDzHTVkJ1zWLwCtHXkQn2VGgR35wr4',
  expires_in: 604800,
  refresh_token: 'ozoX5auwohkHvPKuIn1zlWrRCf6DXY',
  scope: 'identify email',
  expires_at: 1741432969,
  provider: 'discord',
  type: 'oauth',
  providerAccountId: '631460480514261012'
}

auth session -user: undefined
auth session -session: {
  user: {
  name: 'Marya',
  email: 'missmeme1416@hotmail.com',
  image: 'https://cdn.discordapp.com/embed/avatars/1.png'
},
  expires: '2025-03-31T11:22:49.964Z'
}
auth session -token: {
  name: 'Marya',
  email: 'missmeme1416@hotmail.com',
  picture: 'https://cdn.discordapp.com/embed/avatars/1.png',
  sub: 'c2205d8d-2e31-48cf-aae5-934b834bc25c',
  iat: 1740828169,
  exp: 1743420169,
  jti: '82da0c58-a930-4de3-82ce-76438a11d1c1'
}
 */
