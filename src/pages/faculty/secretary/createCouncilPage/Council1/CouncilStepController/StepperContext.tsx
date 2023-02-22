import { createContext, useContext, useState } from "react";

const StepperContext = createContext({ userData: "", setUserData: null });

export function UseContextProvider({ children } : {children: any}) {
  const [userData, setUserData] = useState("");

  return (
    // <StepperContext.Provider value={{ userData, setUserData }}> ORIGINAL
    <StepperContext.Provider value={{ userData, setUserData: null }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const { userData, setUserData } = useContext(StepperContext);

  return { userData, setUserData };
}
