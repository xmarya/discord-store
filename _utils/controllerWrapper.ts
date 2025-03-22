import { dbStartConnection } from "@/_config/db";
import { AppError } from "./AppError";
import mongoose from "mongoose";

/* 3- accepts the passed Generic and use it to type my parameters*/
type Controller<Args extends any[], T> = (...args: Args) => Promise<T>;

/* OLD CODE (kept for reference): 
// type withDBConnection = (Controller:Controller) => Promise<void>
  typing the args of withDBConnection was throwing an error from : <form action={ControllerFunction}>
  says: Type 'withDBConnection' is not assignable to type 'string | ((formData: FormData) => void | Promise<void>) | undefined'.
  Type 'withDBConnection' is not assignable to type '(formData: FormData) => void | Promise<void>'.
    Types of parameters 'Controller' and 'formData' are incompatible.
      Type 'FormData' is not assignable to type 'Controller'.
        Type 'FormData' provides no match for the signature '(...args: any[]): void'.
*/

/* 1- receives a Generic called Args*/ /* 2- sends the Generic to Controller */
export const withDBConnection = <Args extends any[], T>
(Controller: Controller<Args, T>): ((...args: Args) => Promise<T >) => {
  return async (...args: Args):Promise<T> => {
    try {
      await dbStartConnection();
      /* OLD CODE (kept for reference): 
        Controller(...args);
        without `return await`, the HOF won't wait for the  inner promise inside the controller until resolved or rejected
        and the code execution proceeds bypassing the `await` inside the controller itself. Instead, 
        it resolves immediately, returning undefined before the inner promise resolves.
       */
      // console.log(mongoose.modelNames());
      return await Controller(...args);
    } catch (error) {
      console.log("inside withDBConnection catch block", error);
      console.log((error as AppError).message);
      throw error;
    }
  };
};

// 1) this answer helped me to find out how to forward the Controller original parameters:
// https://stackoverflow.com/questions/66180541/convert-function-to-async-function-without-redefining

// 2) OLD PROBLEM: for typing the Controller to take args without knowing how many they are and what are their types,
//    there is a TypeScript utility called Parameters
//    this utility type extracts the parameter types of a function type as a tuple.
//    ...args: Parameters<Controller>:
//    The args in the returned function : return async (...args: Parameters<Controller>)
//    are typed using Parameters<Controller>, ensuring that the arguments passed to Controller : Controller(...args)
//    match the expected parameter types in this line: type Controller = (...args: any[]) => void;

// 3) reference to my question: How to define the correct return type in Higher-Order Functions:
// https://stackoverflow.com/questions/79479201/how-to-define-the-correct-return-type-in-higher-order-functions/79479231#79479231
