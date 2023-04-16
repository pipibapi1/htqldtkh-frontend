import React from "react";
import { variableInfo } from "../../../../../../shared/interfaces/topicConditionInterface";
import { VariableTypeEnum } from "../../../../../../shared/types/variableType";

interface variableElement {
    keyId: string,
    variable: variableInfo,
    onUpdate: variableArrUpdate
}

type variableArrAction = (arr: variableInfo[]) => variableInfo[]
type variableArrUpdate = (action: variableArrAction) => void

export const VariableElement: React.FC<variableElement> = ({variable, onUpdate, keyId}) => {
    const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        const deleteThisVariable = (variableArr: variableInfo[]) => {
            return variableArr.filter((variable) => variable.key !== keyId);
        }
        onUpdate(deleteThisVariable);
    }

    const onChangeVariable = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const changeVariable = (variableArr: variableInfo[]) => {
            const targetVariable = event.target.value;
            const updateIndex = variableArr.findIndex((variable) => variable.key === keyId);
            if (updateIndex !== -1) {
                const oldVar = variableArr[updateIndex];
                let updatedVar: variableInfo = {
                    ...oldVar,
                    variable: targetVariable,
                    subjectName: "",
                    subjectId: ""
                }
                return [
                    ...variableArr.slice(0, updateIndex),
                    updatedVar,
                    ...variableArr.slice(updateIndex + 1)
                ]
            }
            return variableArr;
        }
        onUpdate(changeVariable);
    }

    const onChangeWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const changeWeight = (variableArr: variableInfo[]) => {
            const checkWeight: boolean = (event.target.value && !isNaN(parseFloat(event.target.value)))? true : false;
            const weight = checkWeight? parseFloat(event.target.value) : undefined
            const updateIndex = variableArr.findIndex((variable) => variable.key === keyId);
            if (updateIndex !== -1) {
                const oldVar = variableArr[updateIndex];
                const updatedVar: variableInfo = {
                    ...oldVar,
                    weight: weight
                }
                return [
                    ...variableArr.slice(0, updateIndex),
                    updatedVar,
                    ...variableArr.slice(updateIndex + 1)
                ]
            }
            return variableArr;
        }
        onUpdate(changeWeight);
    }

    const onChangeSubjectName = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const changeSubjectName = (variableArr: variableInfo[]) => {
            const subjectName = event.target.value;
            const updateIndex = variableArr.findIndex((variable) => variable.key === keyId);
            if (updateIndex !== -1) {
                const oldVar = variableArr[updateIndex];
                const updatedVar: variableInfo = {
                    ...oldVar,
                    subjectName: subjectName
                }
                return [
                    ...variableArr.slice(0, updateIndex),
                    updatedVar,
                    ...variableArr.slice(updateIndex + 1)
                ]
            }
            return variableArr;
        }
        onUpdate(changeSubjectName);
    }  

    const onChangeSubjectId = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const changeSubjectId = (variableArr: variableInfo[]) => {
            const subjectId = event.target.value;
            const updateIndex = variableArr.findIndex((variable) => variable.key === keyId);
            if (updateIndex !== -1) {
                const oldVar = variableArr[updateIndex];
                const updatedVar: variableInfo = {
                    ...oldVar,
                    subjectId: subjectId
                }
                return [
                    ...variableArr.slice(0, updateIndex),
                    updatedVar,
                    ...variableArr.slice(updateIndex + 1)
                ]
            }
            return variableArr;
        }
        onUpdate(changeSubjectId);
    }  

    return (
        <div className="flex flex-row items-center border border-[#d9d9d9] border-1 rounded-lg p-1 my-1">
            <button className="pi pi-times"
                onClick={onDelete}
            ></button>
            <select
                className={`bg-white h-[40px] border ${variable.variable? 'border-[#1488d8]':'border-[#e1000e]'} border-1 rounded-lg px-1 mx-1`}
                defaultValue={variable.variable? variable.variable:""}
                onChange={onChangeVariable}
            >
                {Object.values(VariableTypeEnum).map((type) => {
                    return (
                        <option value={type} key={type}>
                            {type}
                        </option>
                    )
                })}
                <option value="" hidden>Chọn trường dữ liệu</option>
            </select>
            {(variable.variable === VariableTypeEnum.SUBJECT_MARK) && (
                <>
                    <input
                        className={`bg-white h-[40px] w-[160px] border ${variable.subjectName? 'border-[#1488d8]':'border-[#e1000e]'} border-1 rounded-lg px-1 mx-1`}
                        defaultValue={variable.subjectName}
                        onChange={onChangeSubjectName}
                        placeholder="Tên môn học"
                    >
                    </input>
                    <input
                        className={`bg-white h-[40px] w-[100px] border ${variable.subjectId? 'border-[#1488d8]':'border-[#e1000e]'} border-1 rounded-lg px-1 mx-1`}
                        defaultValue={variable.subjectId}
                        onChange={onChangeSubjectId}
                        placeholder="Mã môn học"
                    >
                    </input>
                </>
            )}
            {variable.variable !== VariableTypeEnum.EDUCATION_TYPE && (
                <>
                    <div>
                        X
                    </div>
                    <input
                        className="bg-white h-[40px] w-[80px] border border-[#1488d8] border-1 rounded-lg px-1 mx-1"
                        defaultValue={variable.weight}
                        onChange={onChangeWeight}
                        placeholder="Trọng số"
                    >
                    </input>
                </>
            )}
        </div>
    )
}