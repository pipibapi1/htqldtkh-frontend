import {useState} from 'react';
import Stepper from "./CouncilStepController/Stepper";
import StepperControl from "./CouncilStepController/StepperControl";
import { StepperContext } from "./CouncilStepController/StepperContext";
import councilService from '../../../../../services/councilService';

import Step1 from "./CouncilStepController/Step1";
import Step2 from "./CouncilStepController/Step2";
import Step3 from "./CouncilStepController/Step3";
import Step4 from "./CouncilStepController/Step4";

import { CouncilInputIntf, CouncilInfoIntf } from '../../../../../shared/interfaces/councilInterface';
import { CouncilTypeEnum } from '../../../../../shared/types/councilType';
import { CouncilStatusEnum } from '../../../../../shared/types/councilStatus';

interface Props {
	onClose: any,
	period: string,
	year: Date,
	onSuccess: (council: CouncilInfoIntf) => void
}

const AddCouncilModal = (props: Props) => {
    const {onClose, period, year, onSuccess} = props;
    const [currentStep, setCurrentStep] = useState(1);
    const [council, setCouncil] = useState<CouncilInputIntf>({
		name: "",
		type: CouncilTypeEnum.XD,
		status: CouncilStatusEnum.NEW,
		period: period,
		time: "",
		date: "",
		place: "",
		numMembers: 0,
		numTopics: 0,
		members: [],
		topics: []
    });

    const stepperContextValue = {
		council: council,
		setCouncil: setCouncil,
		year: year
    }

    const steps = [
      "Step 1",
      "Step 2",
      "Step 3",
      "Step 4",
    ];
  
    const displayStep = (step: any) => {
      switch (step) {
        case 1:
          return <Step1/>;
        case 2:
          return <Step2/>;
        case 3:
          return <Step3/>;
        case 4:
          return <Step4
		  	onClose={onClose}
		  />;
        default:
      }
    };

    const handleClose = (e: any) => {
        if (e.target.id === "wrapper") onClose();
    }

    const handleClick = (direction: any) => {
        let newStep = currentStep;
        if ((direction === "next")  && (currentStep === steps.length - 1)) {
			const councilData = {
				...council,
				topics: council.topics.map((topic) => topic._id).slice(0, council.numTopics)
			}
			councilService.postNewCouncil(councilData)
				.then((data) => {
					setCurrentStep(currentStep + 1);
					onSuccess(data);
				})
        }
        else {
			direction === "next" ? newStep++ : newStep--;
			// check if steps are within bounds
			newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
        }
    };

    return (
        <div className = "fixed inset-0 bg-black bg-opacity-50 backdrop-blur-0 flex flex-col justify-center items-center" id= "wrapper" onClick={handleClose}>
            <div className = "md:w-[800px] w-[90%] h-[450px] overflow-y-auto mx-auto">
                <div className = 'bg-white rounded p-2'>
                    <div className = "py-6 px-6 lg:px-8 text-left">
                      <div className = 'mb-8 pb-4 text-xl font-medium text-gray-900 text-center border-b-2 border-black'>
                          Thêm hội đồng xét duyệt
                      </div>
                    </div>

                    <div className="horizontal container mt-2 ">
                      <div className="my-5 px-10 ">
                        <Stepper step ={currentStep} />
                      </div>
                      <div className="my-10 pt-5 ">
                        <StepperContext.Provider value={stepperContextValue}>
                          {displayStep(currentStep)}
                        </StepperContext.Provider>
                      </div>
                    </div>

                    {/* navigation button */}
                    {currentStep !== steps.length && (
                        <StepperControl
                          handleClick={handleClick}
                          currentStep={currentStep}
                          steps={steps}
                        />
                    )}

                </div>
            </div>
        </div>
    )
}

export default AddCouncilModal