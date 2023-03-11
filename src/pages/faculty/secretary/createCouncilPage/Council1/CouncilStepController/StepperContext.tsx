import { createContext, useContext} from "react";
import { CouncilInputIntf } from "../../../../../../shared/interfaces/councilInterface";
import { CouncilTypeEnum } from "../../../../../../shared/types/councilType";
import { CouncilStatusEnum } from "../../../../../../shared/types/councilStatus";

interface StepperContextValue {
	council: CouncilInputIntf,
	year: Date,
	setCouncil: any,
	error: Error,
	setError: any
}

interface Error {
	periodErr: boolean,
	nameErr: string,
	timeErr: string,
	dateErr: string,
	placeErr: string,
	memberErr: {
		nameErr: string,
		emailErr: string
	}[]
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

const initError = {
	periodErr: false,
	nameErr: "",
	timeErr: "",
	dateErr: "",
	placeErr: "",
	memberErr: []
}

export const StepperContext = createContext<StepperContextValue>({ 
	council: initCouncil, 
	year: new Date(),
	setCouncil: null,
	error: initError,
	setError: null
});

export const useStepperContext = () => useContext(StepperContext)
