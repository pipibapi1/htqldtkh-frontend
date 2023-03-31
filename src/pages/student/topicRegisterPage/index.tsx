import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import { RootState } from '../../../store';

import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';

import { RoleType } from '../../../shared/types/role';
import { topicInput } from '../../../shared/interfaces/topicInterface';
import { StudentAccountStatusEnum } from '../../../shared/types/studentAccountStatus';

import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import ChoosePeriod from './ChoosePeriod';

interface Period{
    _id: string;
    period: string;
    status: string;
    createAt: Date;
    title: string;
}

const RegisterTopicPage:React.FC = () => {
    const location = useLocation();
    const { user: currentUser } = useSelector((state: RootState) => state.auth);
    const [isAtStep1, setIsAtStep1] = useState<Boolean>(true);
    const [chosen, setChosen] = useState<Boolean>(false);
    const [period, setPeriod] = useState<Period>()
    const [topic, setTopic] = useState<topicInput>({
        name: "",
        type: "Chính quy",
        period: "",
        studentId: "",
        otherMembers: [],
        instructorsId: [""], 
        instructors:[{
            staffId: "",
            name: "",
            gender: "Nam",
            email: "",
            phoneNumber: "",
            birthDate: (new Date()).toString(),
            academyRank: "Giáo sư",
            degree: "Tiến sỹ",
        }],
        numInstructor: 1,
        numMember: 1,
    });

    const choosePeriod = (period: any) => {
        setChosen(true);
        setPeriod(period);
        setTopic({
            ...topic,
            period: period._id
        })
    }

    const backToChoosePeriod = (e: any) => {
        setChosen(false);
        setPeriod(undefined);
        setTopic({
            ...topic,
            period: ""
        })
    }

    const backToStep1 = (e: any) => {
        setIsAtStep1(true);
    }

    return (

            <div>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"ĐĂNG KÝ ĐỀ TÀI"}/>
                    {currentUser.accountStatus === StudentAccountStatusEnum.approved ? 
                        (chosen ?
                        (isAtStep1?
                        (<RegisterStep1
                            onSetNextStep={setIsAtStep1}
                            period={period}
                            backToChoosePeriod={backToChoosePeriod}
                            topic={topic}
                            setTopic={setTopic}
                        />)
                        :(<RegisterStep2
                            backToStep1={backToStep1}
                            backToChoosePeriod={backToChoosePeriod}
                            topic={topic}
                            setTopic={setTopic}
                            setIsAtStep1={setIsAtStep1}
                        />)) : 
                        <ChoosePeriod 
                                choosePeriod={choosePeriod}
                                setTopic={setTopic}
                                topic={topic}
                            />)
                        : 
                    <div className="p-5">
                        Hiện tại tài khoản của bạn chưa được duyệt nên bạn chưa thể dùng tính năng này.
                    </div>
                    }
                </div>
            </div>
        </div> 

    )
}

export default RegisterTopicPage;