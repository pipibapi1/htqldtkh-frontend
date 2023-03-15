import React from 'react';

import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';

import { RoleType } from '../../../shared/types/role';
import { appRouters } from "../../../shared/urlResources";

import TopicPaperCreation from './TopicPaperCreation';

const StudentTopicPaperCreation:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={"/" + appRouters.LINK_TO_MY_TOPIC_PAGE}/>
                <div className=''>
                    <PathHead path={"ĐỀ TÀI CỦA TÔI / Giấy tờ liên quan / Tạo giấy tờ từ form"}/>
                    <TopicPaperCreation />
                </div>
            </div>
        </div>
    )
}

export default StudentTopicPaperCreation;