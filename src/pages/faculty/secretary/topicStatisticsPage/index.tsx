import React from 'react';
import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import { RoleType } from '../../../../shared/types/role';

const FSTopicStatistics: React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <SideNav role={RoleType.FS} pathName={"/"}/>
        </div>
    )
}

export default FSTopicStatistics;