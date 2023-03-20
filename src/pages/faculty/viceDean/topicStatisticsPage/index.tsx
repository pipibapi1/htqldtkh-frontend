import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../../components/header';
import PathHead from '../../../../components/pathHead';
import SideNav from '../../../../components/sideNav';

import { RoleType } from '../../../../shared/types/role';

import TopicStatistic from '../../statistic/topic/TopicStatistic';

const FVDTopicStatistics: React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FVD} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"BÁO BIỂU THỐNG KÊ / Đề tài"}/>
                    <TopicStatistic />
                </div>
            </div>
        </div>
    )
}

export default FVDTopicStatistics;