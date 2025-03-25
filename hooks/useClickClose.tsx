import { useEffect, useRef } from "react";


export function useClickClose(closeFn:() => void) {
    // const clickRef = useRef<HTMLElement>(null);
    const clickRef = useRef<any>(null); /* CHANGE LATER: type this properly. it causes an error in OptionsList */

    useEffect(() => {
        function handleClickClose(event:MouseEvent) {
            if(event.currentTarget instanceof Node && clickRef.current &&
                 !clickRef.current.contains(event.currentTarget)) closeFn();
        }
        
        document.addEventListener("click", handleClickClose, true);

        // remove the listener once the comp unmounts:
        return () => document.removeEventListener("click", handleClickClose, true);
    }, [closeFn]);

    return clickRef;
}