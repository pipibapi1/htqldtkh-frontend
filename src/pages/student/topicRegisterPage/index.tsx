import React, {useState} from 'react';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import ChoosePeriod from './ChoosePeriod';
import { useLocation } from 'react-router-dom';
import { RoleType } from '../../../shared/types/role';

interface Period{
    _id: string;
    period: string;
    status: string;
    createAt: Date;
    title: string;
}

const RegisterTopicPage:React.FC = () => {
    const location = useLocation();
    const [isAtStep1, moveToNextStep] = useState<Boolean>(true);
    const [chosen, setChosen] = useState<Boolean>(false);
    const [period, setPeriod] = useState<Period>()
    const [numOfInstructor, setNumOfInstructor] = useState<number>(1);
    const [numOfOtherMember, setNumOfOtherMember] = useState<number>(0);

    const choosePeriod = (period: any) => {
        setChosen(true);
        setPeriod(period);
    }

    const backToChoosePeriod = (e: any) => {
        setChosen(false);
        setPeriod(undefined);
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
                            <ChoosePeriod choosePeriod={choosePeriod}/>
                        )
                    }
                    {chosen &&
                    (isAtStep1?
                    (<RegisterStep1 
                        onSetNumOfInstructor={setNumOfInstructor} 
                        onSetNumOfOtherMember={setNumOfOtherMember}
                        onSetNextStep={moveToNextStep}
                        period={period}
                        backToChoosePeriod={backToChoosePeriod}
                    />)
                    :(<RegisterStep2 
                        numOfInstructor={numOfInstructor} 
                        numOfOtherMember={numOfOtherMember}
                        period={period}
                    />))
                    }
                </div>
            </div>
        </div>
    )
}

export default RegisterTopicPage;