import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";

import "react-step-progress-bar/styles.css";

import "./MultiStepProgressBar.css";

interface Props {
  step: number
}

const Stepper : React.FC <Props> = (props) => {
  return (
    <ProgressBar
        percent={((props.step - 1) * 100) / 3}
        filledBackground="bg-[#025A97]"
      >
        <Step transition="scale">
          {({ accomplished, index } : {accomplished: any, index: any}) => (
            <div
              className={`step ${accomplished ? "completed" : null}`}
            >
              1
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }: {accomplished: any, index: any}) => (
            <div
              className={`step ${accomplished ? "completed" : null}`}
            >
              2
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }: {accomplished: any, index: any}) => (
            <div
              className={`step ${accomplished ? "completed" : null}`}
            >
              3
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished, index }: {accomplished: any, index: any}) => (
            <div
              className={`step ${accomplished ? "completed" : null}`}
            >
              4
            </div>
          )}
        </Step>
      </ProgressBar>
  );
};

export default Stepper;
