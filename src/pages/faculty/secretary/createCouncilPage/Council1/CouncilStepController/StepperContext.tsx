import { createContext, useContext} from "react";
import { CouncilInputIntf } from "../../../../../../shared/interfaces/councilInterface";
import { CouncilTypeEnum } from "../../../../../../shared/types/councilType";
import { CouncilStatusEnum } from "../../../../../../shared/types/councilStatus";

interface StepperContextValue {
  council: CouncilInputIntf,
  year: Date,
  setCouncil: any
}

const initCouncil = {
  name: "",
  type: CouncilTypeEnum.XD,
  status: CouncilStatusEnum.NEW,
  period: "",
  time: "",
  date: "",
  place: "",
  numMembers: 0,
  numTopics: 0,
  members: [],
  topics: []
}

export const StepperContext = createContext<StepperContextValue>({ 
  council: initCouncil, 
  year: new Date(),
  setCouncil: null
});

export const useStepperContext = () => useContext(StepperContext)
