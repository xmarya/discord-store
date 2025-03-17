import { StatusCode } from "./FormContext";

// STEP 1) Create a mapping type with keys hold a specific type.
export type EventTypesMap = {
  onBlur: React.FocusEvent<HTMLInputElement>,
  onKeyDown: React.KeyboardEvent<HTMLInputElement>
}

// STEP 2) use keyof to MAP to extract the keys into a separate type.
export type EventTypes = keyof EventTypesMap;

// STEP 3) use them as a Generic to dynamically resolve the correct type based on the key.
export type FormContextInput <T extends EventTypes> = {
  name:string,
  eventType: T,
  validate: (event:EventTypesMap[T]) => StatusCode | Promise<StatusCode>

} & React.InputHTMLAttributes<HTMLInputElement> 

/* OLD CODE (kept for reference): 
    export type FormContextInput  = {
      name:string,
    } & React.InputHTMLAttributes<HTMLInputElement> &(
      {eventType: "onBlur", validate: (event:React.FocusEvent<HTMLInputElement>) => StatusCode | Promise<StatusCode>}
      |
      {eventType: "onKeyDown", validate: (event:React.KeyboardEvent<HTMLInputElement>) => StatusCode | Promise<StatusCode>}
    );
*/


/*
  The current FormContextInput type includes eventType and validate as separate properties, 
  but they are not linked. So TypeScript can't enforce that when eventType is 'onBlur', validate should take a FocusEvent.
  That's probably the root of the issue.
  The solution would be to create a discriminated union 
  where eventType and the event type in validate are connected. 
  That way, when eventType is 'onBlur', validate is a function that takes a FocusEvent, 
  and similarly for 'onKeyDown' and KeyboardEvent.
*/