import { createContext, useContext } from "react";

import { CouncilDetailIntf } from "../../../../../../shared/interfaces/councilInterface";
import { CouncilTypeEnum } from "../../../../../../shared/types/councilType";
import { CouncilStatusEnum } from "../../../../../../shared/types/councilStatus";

interface CouncilDetailContextValue {
  council: CouncilDetailIntf,
  setCouncil: any
}

const initCouncil = {
    _id: "",
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
    topicGeneralInfos: []
}

export const CouncilDetailContext = createContext<CouncilDetailContextValue>({ 
  council: initCouncil,
  setCouncil: null
});

export const useCouncilDetailContext = () => useContext(CouncilDetailContext)
