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
        const changeVariable = (variableArr: variableIntf[]) => {
            const targetVariable = event.target.value;
            const updateIndex = variableArr.findIndex((variable) => variable.key === keyId);
            if (updateIndex !== -1) {
                variableArr[updateIndex].variable = targetVariable
            }
            return variableArr;
        }
        onUpdate(changeVariable);
    }

    const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const changeWeight = (variableArr: variableIntf[]) => {
            const checkWeight: boolean = (event.target.value && !isNaN(parseFloat(event.target.value)))? true : false;
            const weight = checkWeight? parseFloat(event.target.value) : undefined
            const updateIndex = variableArr.findIndex((variable) => variable.key === keyId);
            if (updateIndex !== -1) {
                variableArr[updateIndex].weight = weight
            }
            return variableArr;
        }
        onUpdate(changeWeight);
    }

    return (
        <div className="flex flex-row items-center border border-[#d9d9d9] border-1 rounded-lg p-1 my-1">
            <button className="pi pi-times"
                onClick={onDelete}
            ></button>
            <input
                className={`bg-white h-[40px] w-[180px] border ${isValidVariable? "border-[#1488d8]" : "border-red-500"} border-1 rounded-lg px-1 mx-1`}
                defaultValue={variable}
                onChange={onChangeVariable}
                placeholder="Giá trị"
            >
            </input>
            <div>
                X
            </div>
            <input
                className="bg-white h-[40px] w-[80px] border border-[#1488d8] border-1 rounded-lg px-1 mx-1"
                defaultValue={weight}
                onChange={onChangeWeight}
                placeholder="Trọng số"
            >
            </input>
        </div>
    )
}