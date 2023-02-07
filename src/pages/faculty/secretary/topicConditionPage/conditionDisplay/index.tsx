import React from "react";
import StaticExprElement from "./staticExpressionElement";
import { useSelector } from "react-redux";
import { RootState} from "../../../../../store";

interface props {
    isEditing: boolean
}

const ConditionDisplay: React.FC<props> = (props) => {
    const {expression} = useSelector((state: RootState) => state.topicCondition);

    if (Object.values(expression).length > 0) {
        return (
            <div>
                <StaticExprElement exprId="root"/>
            </div>
        )
    }
    else {
        return (
            <div>
                Loại đề tài này không yêu cầu điều kiện nào
            </div>
        )
    }
}

export default ConditionDisplay