/*
    NOTE: This is where you can control the behaviour of the library 
    and specify custom authentication logic, adapters, etc.
*/
import Discord from "@auth/express/providers/discord";

export const authConfig = {
    trustedHost: true,
    providers: [Discord]
}