import React from 'react';
import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';
import PathHead from '../../../../components/pathHead';
import { RoleType } from '../../../../shared/types/role';
import TopicProduct from './TopicProduct';
import { appRouters } from "../../../../shared/urlResources";

const FSTopicProduct:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={"/" + appRouters.LINK_TO_FS_TOPIC_MANAGEMENT}/>
                <div className=''>
                    <PathHead path={"QUẢN LÝ ĐỀ TÀI / Đề tài / Sản phẩm"}/>
                    <TopicProduct/>
                </div>
            </div>
        </div>
    )
}

export default FSTopicProduct;