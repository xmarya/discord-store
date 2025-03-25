"use client"

import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";


type Props = {
    children:React.ReactNode,
}

type ContextProps = {
    menuId:number | string | undefined,
    open: Dispatch<SetStateAction<string | number | undefined>>
    /* OLD CODE (kept for reference): 
        // close: () => (value: SetStateAction<string | number>) => void 
        // this is wrong. because CLOSE doesn't return a function that returns the setMenuId.
        the setMenuId is DIRECTLY assigned to CLOSE + no need to accept a value because it's meant to set the state to ""
    */
    close: () => void,
    position: {
        x:number,
        y:number
    },
    setPosition: Dispatch<SetStateAction<{
        x: number;
        y: number;
    }>>
}

const MenuContext = createContext<ContextProps>({} as ContextProps);

function MenuContextProvider({children}:Props) {
    const [menuId, setMenuId] = useState<number | string | undefined>(undefined);
    const [position, setPosition] = useState<{x:number, y:number}>({x:0, y:0});
    const open = setMenuId;
    const close = () => setMenuId(undefined);

    useEffect(() => {
        console.log("effect MenuId", menuId);
    }, [menuId]);

    return (
        <MenuContext value={{menuId, open, close, position, setPosition}}>
            {children}
        </MenuContext>
    )
}

export {MenuContextProvider, MenuContext};

