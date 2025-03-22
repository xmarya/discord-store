/*
NOTE: This is where you can control the behaviour of the library 
and specify custom authentication logic, adapters, etc.
*/

import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials"
import { getOneById, getUser, getUserById } from "@/_actions/controllerGlobal";
import { createDiscordUser } from "@/_actions/mutation/user";

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
      plan:string,
      isOauth:boolean,
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */

      // TODO: add the plan name
    } & DefaultSession["user"];
  }
}


const authConfig = NextAuth({
  providers: [Discord, 
    Credentials({
      name: "Credentials",
      async authorize(credentials, request) {
        // console.log("Credentials authorize", credentials);
        const {email} = credentials;
        if(typeof email !== "string") return null;
        const user = await getUser(email);
        // console.log("Credentials authorize2", user);
        
       return {id: user?._id, userType: user?.userType, plan: user?.planName};
      }
    })],
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
    async jwt({token, user, account, profile}) {
      console.log("JWT CALLBACK 🔐");
      /* This callback persists the data (such as Access Token). any kind of data
        that is wanted to be stored in the browser should be assigned to the token argument.
        then the session callback passes the data through to the browser.
        JWT is called whenever:
          A- a JSON Web Token is created (i.e. at sign in) 
          B- or updated (i.e whenever a session is accessed in the client). 
        The returned value will be encrypted, and it is stored in a cookie.
        token expiry time is extended whenever a session is active.
        NOTE: The arguments user, account, profile and isNewUser are 
        only passed the first time this callback is called on a new session, 
        after the user signs in. In subsequent calls, only token will be available.
        another important thing about this callback is that is MUST always return the token object.
       */
      if(!token.sub) return token;
      const isExist = await getOneById("User",token.sub);
        console.log("auth JWT isExist", !!isExist);
      if(!isExist) return token

      // check if the user' signMethod:
      console.log("isExist.signMethod",isExist.signMethod);
      // adding a isOAuth property to the token for later in signIn callback:
      token.isOAuth = isExist.signMethod === "discord" ? true : false;
      token.username = isExist.username
      token.plan = isExist.planName;
      token.email = isExist.email;
      token.image = isExist.image;

      return token;

    },
    async session({ session, token, user }) {
      console.log("SESSION CALLBACK ⏳");
      const currentUser = await getUser(session?.user.email);
      // console.log("currentUser🔴", currentUser);

      if(!currentUser?._id) throw new Error("no user found, the session couldn't be created");
      // console.log("⏳⏳⏳",session);
      // 1) adding the role and the id to the session info:
      return {
        ...session,
        user :{
          id: currentUser._id,
          userType: currentUser.userType,
          plan: token.plan,
          isOauth:token.isOauth
        }
      };
    },
    async signIn({ user, credentials, account }) {
      // console.log("SIGNIN CALLBACK 🔎user", !!user);
      // console.log("SIGNIN CALLBACK 🔎credentials", credentials);
      // console.log("SIGNIN CALLBACK account", account);
      
      try {
        if (typeof user.email !== "string" && !credentials?.email) return false; // to solve => Argument of type 'string | null | undefined' is not assignable to parameter of type 'string'.
        // 1) look up for the sam email in the db
        const email = (user.email ?? credentials?.email) as string
        const isExist = await getUser(email);
        // console.log("isExist", isExist);
        //TODO: if not exist => forward the user to the plan page to select one and pay for it then create a new user

        /* OLD CODE (kept for reference): 
            if (!isExist) await createNewUser(user);
            the statement above was not work since the getUser() return an empty array [].
            in javascript [] and {} are falsy but non-nullish value
            if course !isExist prints false bu the if condition behaves differently:
            if (!isExist) is effectively if (![]), which does not trigger because [] is a truthy value.
            the syntax !isExist ONLY WORKS with undefined and null

            NOTE: since it genONEUser I changed the query type from find that returns an array to findOne that returns a single object
        */
        // 2) if not exist then create a new user
        if (!isExist && account?.provider === "discord") await createDiscordUser(user);
        return true;

      } catch (error) {
        return false;
        // NOTE: this md only returns boolean, that'w why I can't throw any error here,
        // handle any error where this md was called (inside the authActions.ts).
      }
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
