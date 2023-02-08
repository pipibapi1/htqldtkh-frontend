import React from "react";
import { exprComponent, expression, logicExprIntf } from "../interface";
import { OperationTypeEnum } from "../../../../../../shared/types/operationType";
import { LogicalExprElement } from "./logicalExprElement";

//for topic condition action in redux
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../../../store";
import { updateExprTopicCondition, 
    deleteExprTopicCondition 
} from "../../../../../../actions/topicConditionAction";

const RelationExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const operator = (expression as expression)[exprId].operator;

    //for topic condition action in redux
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const onChangeSelectOperatorType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newExpr = {operator : e.target.value};
        dispatch(updateExprTopicCondition(newExpr, exprId));
    }

    return (
        <div className="flex flex-col border-[#1488d8] border-2 rounded p-2 mx-1 my-2">
            <EditableExprElement exprId={`${exprId},l`}/>
            <div className="mx-2">
                <select
                    className="bg-white h-[40px] w-[80px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
                        defaultValue={operator}
                        onChange={onChangeSelectOperatorType}
                    >
                    <option value={OperationTypeEnum.AND}>{OperationTypeEnum.AND}</option>
                    <option value={OperationTypeEnum.OR}>{OperationTypeEnum.OR}</option>
                </select>
            </div>
            <EditableExprElement exprId={`${exprId},r`}/>
        </div>
    )
}

const EditableExprElement : React.FC<exprComponent> = ({exprId}) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);
    const operator = (expression as expression)[exprId].operator;
    if (operator === OperationTypeEnum.AND || 
        operator === OperationTypeEnum.OR)
    {
        return (<RelationExprElement exprId={exprId}/>)
    }
    else {
        return (<LogicalExprElement exprId={exprId}/>)
    }
}

export default EditableExprElement;