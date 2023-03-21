import React from 'react';

import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import PathHead from '../../../../components/pathHead';

import { RoleType } from '../../../../shared/types/role';
import { appRouters } from "../../../../shared/urlResources";

import Feedback from './Feedback';

const FSFeedbackPage:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={"/" + appRouters.LINK_TO_FS_TOPIC_MANAGEMENT}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ ĐỀ TÀI / Đề tài / Góp ý"}/>
                    <Feedback />
                </div>
            </div>
        </div>
    )
}

export default FSFeedbackPage;