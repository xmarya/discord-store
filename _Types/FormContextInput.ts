import { StatusCode } from "./FormContext";

export type FormContextEvent = React.FocusEvent<HTMLInputElement> | KeyboardEvent;

export type FormContextInput  = {
  name:string,
  // validate: ValidateEventOptions,
} & React.InputHTMLAttributes<HTMLInputElement> &(
  {eventType: "onBlur", validate: (event:React.FocusEvent<HTMLInputElement>) => StatusCode | Promise<StatusCode>}
  |
  {eventType: "onKeyDown", validate: (event:React.KeyboardEvent<HTMLInputElement>) => StatusCode | Promise<StatusCode>}
);


/*
  The current FormContextInput type includes eventType and validate as separate properties, 
  but they are not linked. So TypeScript can't enforce that when eventType is 'onBlur', validate should take a FocusEvent.
  That's probably the root of the issue.
  The solution would be to create a discriminated union 
  where eventType and the event type in validate are connected. 
  That way, when eventType is 'onBlur', validate is a function that takes a FocusEvent, 
  and similarly for 'onKeyDown' and KeyboardEvent.
*/