import React from 'react';

import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';

import { RoleType } from '../../../shared/types/role';
import { appRouters } from "../../../shared/urlResources";

import TopicProduct from './TopicProduct';

const StudentTopicProduct:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={"/" + appRouters.LINK_TO_MY_TOPIC_PAGE}/>
                <div className=''>
                    <PathHead path={"ĐỀ TÀI CỦA TÔI / Sản phẩm"}/>
                    <TopicProduct/>
                </div>
            </div>
        </div>
    )
}

export default StudentTopicProduct;