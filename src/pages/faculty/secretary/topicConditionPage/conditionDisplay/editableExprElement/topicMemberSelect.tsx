import React from "react";
import { logicExprIntf } from "../../../../../../shared/interfaces/topicConditionInterface";
import { TopicMemberTypeEnum } from "../../../../../../shared/types/topicMemberType";
import { AppDispatch } from "../../../../../../store";
import { useDispatch } from "react-redux";
import { updateExprTopicCondition } from "../../../../../../actions/topicConditionAction";
import { QuantityMemberCompareEnum } from "../../../../../../shared/types/quantityMemberCompare";

interface Props {
    subExpr: logicExprIntf,
    exprId: string
}

export const TopicMemberSelect : React.FC<Props> = ({subExpr, exprId}) => {
    const useAppDispatch: () => AppDispatch = useDispatch;
    const dispatch = useAppDispatch();

    const onChangeTopicMemberType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === TopicMemberTypeEnum.NumMember) {
            const newSubExpr: logicExprIntf = {
                ...subExpr,
                object: {
                    name: event.target.value,
                    quantity: "",
                    compare: QuantityMemberCompareEnum.EQUAL
                }
            };
            dispatch(updateExprTopicCondition(newSubExpr, exprId));
        }
        else {
            const newSubExpr: logicExprIntf = {
                ...subExpr,
                object: {
                    name: event.target.value
                }
            };
            dispatch(updateExprTopicCondition(newSubExpr, exprId));
        }
    }

    const onChangeCompare = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSubExpr: logicExprIntf = {
            ...subExpr,
            object: {
                ...subExpr.object,
                compare: event.target.value
            }
        };
        dispatch(updateExprTopicCondition(newSubExpr, exprId));
    }

    const onChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSubExpr: logicExprIntf = {
            ...subExpr,
            object: {
                ...subExpr.object,
                quantity: event.target.value
            }
        };
        dispatch(updateExprTopicCondition(newSubExpr, exprId));
    }

    const isValidQuantity = () => {
        const quantity = subExpr.object.quantity as string;
        const pattern = /[1-9][0-9]*([,.][0-9]*)?(%)?|([0-9]*[/][1-9][0-9]*)/;
        return quantity.match(pattern)? true:false;
    }

    return (
        <>
            {subExpr.object.name===TopicMemberTypeEnum.NumMember && (
                <>
                    <select
                        className="bg-white h-[40px] border border-[#1488d8] border-1 rounded-lg focus:ring-blue-500 focus:outline-none px-1"
                        value={subExpr.object.compare}
                        onChange={onChangeCompare}
                    >
                        {Object.values(QuantityMemberCompareEnum).map((type) => {
                            return (
                                <option key={type} value={type}>{type}</option>
                            )
                        })}
                    </select>
                    <input
                        className={`bg-white h-[40px] w-[70px] border ${isValidQuantity()? "border-[#1488d8]" : "border-red-500"} border-1 rounded-lg focus:ring-blue-500 px-1 mx-1`}
                        placeholder="Số lượng"
                        defaultValue={subExpr.object.quantity}
                        onChange={onChangeQuantity}
                    >
                    </input>
                </>
            )}
            <select
                className="bg-white h-[40px] border border-[#1488d8] border-1 rounded-lg focus:ring-blue-500 px-1"
                value={subExpr.object.name}
                onChange={onChangeTopicMemberType}
            >
                {Object.values(TopicMemberTypeEnum).map((type) => {
                    return (
                        <option 
                            value={type}
                            key={type}
                        >
                            {type}
                        </option>
                    )
                })}
            </select>
        </>
    )
}