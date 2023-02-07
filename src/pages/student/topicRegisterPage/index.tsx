import React, {useState} from 'react';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import { useLocation } from 'react-router-dom';
import { RoleType } from '../../../shared/types/role';

const RegisterTopicPage:React.FC = () => {
    const location = useLocation();
    const [isAtStep1, moveToNextStep] = useState<Boolean>(true);
    const [numOfInstructor, setNumOfInstructor] = useState<number>(1);
    const [numOfOtherMember, setNumOfOtherMember] = useState<number>(0);

    return (
        <div>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"ĐĂNG KÝ ĐỀ TÀI"}/>
                    {isAtStep1?
                    (<RegisterStep1 
                        onSetNumOfInstructor={setNumOfInstructor} 
                        onSetNumOfOtherMember={setNumOfOtherMember}
                        onSetNextStep={moveToNextStep}
                    />)
                    :(<RegisterStep2 
                        numOfInstructor={numOfInstructor} 
                        numOfOtherMember={numOfOtherMember}
                    />)
                    }
                </div>
            </div>
        </div>
    )
}

export default RegisterTopicPage;