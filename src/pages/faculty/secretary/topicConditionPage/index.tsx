import React from 'react';
import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import PathHead from '../../../../components/pathHead';
import { RoleType } from '../../../../shared/types/role';
import { useLocation } from 'react-router-dom';
import FSTopicConditionEditor from './topicConditionEditor';

const FSTopicConditionManagement: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ ĐỀ TÀI / Điều kiện đăng ký"}/>
                    <FSTopicConditionEditor/>
                </div>
            </div>
        </div>
    )
}

export default FSTopicConditionManagement;