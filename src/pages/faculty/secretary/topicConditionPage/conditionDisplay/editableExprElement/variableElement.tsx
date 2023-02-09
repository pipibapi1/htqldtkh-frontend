import React from "react";

interface variableIntf {
    key: string,
    variable: string,
    weight?: number
}

interface variableElement {
    keyId: string,
    variable: string,
    weight?: number,
    onUpdate: variableArrUpdate
}

type variableArrAction = (arr: variableIntf[]) => variableIntf[]
type variableArrUpdate = (action: variableArrAction) => void

export const VariableElement: React.FC<variableElement> = ({variable, weight, onUpdate, keyId}) => {
    const [isEditingName, setIsEditingName] = React.useState<boolean>(false);
    const [isEditingWeight, setIsEditingWeight] = React.useState<boolean>(false);

    //for style invalid input
    const isValidVariable = variable? true : false;

    const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteThisVariable = (variableArr: variableIntf[]) => {
            return variableArr.filter((variable) => variable.key !== keyId);
        }
        onUpdate(deleteThisVariable);
    }

    const onChangeVariable = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsEditingName(false)
        const changeVariable = (variableArr: variableIntf[]) => {
            return variableArr.map((variable) => {
                if (variable.key === keyId) {
                    return {
                        ...variable,
                        variable: event.target.value
                    };
                }
                else {
                    return variable;
                }
            })
        }
        onUpdate(changeVariable);
    }

    const onStartEditVariable = (event: React.MouseEvent<HTMLInputElement>) => {
        setIsEditingName(true);
    }

    const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setIsEditingWeight(false);
        const changeWeight = (variableArr: variableIntf[]) => {
            return variableArr.map((variable) => {
                if (variable.key === keyId) {
                    const checkWeight: boolean = (event.target.value && !isNaN(parseFloat(event.target.value)))? true : false;
                    return {
                        ...variable,
                        weight: checkWeight? parseFloat(event.target.value) : undefined
                    };
                }
                else {
                    return variable;
                }
            })
        }
        onUpdate(changeWeight);
    }

    const onStartEditWeight = (event: React.MouseEvent<HTMLInputElement>) => {
        setIsEditingWeight(true);
    }

    return (
        <div className="flex flex-row items-center border border-[#d9d9d9] border-1 rounded-lg p-1 my-1">
            <button className="pi pi-times"
                onClick={onDelete}
            ></button>
            <input
                className={`bg-white h-[40px] w-[180px] border ${isValidVariable? "border-[#1488d8]" : "border-red-500"} border-1 rounded-lg px-1 mx-1`}
                defaultValue={variable}
                onMouseDown={isEditingName? undefined : onStartEditVariable}
                onBlur={isEditingName? onChangeVariable : undefined}
                placeholder="Giá trị"
            >
            </input>
            <div>
                X
            </div>
            <input
                className="bg-white h-[40px] w-[80px] border border-[#1488d8] border-1 rounded-lg px-1 mx-1"
                defaultValue={weight}
                onMouseDown={isEditingWeight? undefined : onStartEditWeight}
                onBlur={isEditingWeight? onChangeWeight : undefined}
                placeholder="Trọng số"
            >
            </input>
        </div>
    )
}