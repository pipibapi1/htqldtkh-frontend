import React, {useState} from 'react';
import Header from '../../../../components/header';
import PathHead from '../../../../components/pathHead';
import SideNav from '../../../../components/sideNav';
import { RoleType } from '../../../../shared/types/role';
import { useLocation } from 'react-router-dom';
import RequestInterface from './RequestInterface';


const VicedeanAccountManagement: React.FC = () => {
    const location = useLocation();

    const [numOfInstructor, setNumOfInstructor] = useState<number>(1);
    const [numOfOtherMember, setNumOfOtherMember] = useState<number>(1);
    return (
        <div className=''>
            <Header isLogin={false} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ TÀI KHOẢN / Phó chủ nhiệm"}/>
                    <div>
                    <RequestInterface 
                        numOfInstructor={numOfInstructor} 
                        numOfOtherMember={numOfOtherMember}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VicedeanAccountManagement;