import React, {useState} from 'react';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import ChoosePeriod from './ChoosePeriod';
import { useLocation } from 'react-router-dom';
import { RoleType } from '../../../shared/types/role';
import { topicInput } from '../../../shared/interfaces/topicInterface';

interface Period{
    _id: string;
    period: string;
    status: string;
    createAt: Date;
    title: string;
}

const RegisterTopicPage:React.FC = () => {
    const location = useLocation();
    const [isAtStep1, setIsAtStep1] = useState<Boolean>(true);
    const [chosen, setChosen] = useState<Boolean>(false);
    const [period, setPeriod] = useState<Period>()
    const [topic, setTopic] = useState<topicInput>({
        name: "",
        type: "Chính quy",
        period: "",
        studentId: "",
        otherMembers: [{
            studentId: "",
            fmName: "",
            name: "",
            gender: "Nam",
            email: "",
            phoneNumber: "",
            educationType: "Chính quy",
            birthDate: (new Date()).toString()
        }],
        instructorsId: [""],
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
                    {
                        !chosen && (
                            <ChoosePeriod 
                                choosePeriod={choosePeriod}
                                setTopic={setTopic}
                                topic={topic}
                            />
                        )
                    }
                    {chosen &&
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
                    />))
                    }
                </div>
            </div>
        </div>
    )
}

export default RegisterTopicPage;