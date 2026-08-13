import { createContext, useState} from "react";

const NavigationContext = createContext()

export const NavigationProvider = (props) =>{
    const [navigation, setNavigation] = useState("Home");
    
    return(
        <NavigationContext.Provider value={[navigation, setNavigation]}>
            {props.children}
        </NavigationContext.Provider>
    )
}

export default NavigationContext;