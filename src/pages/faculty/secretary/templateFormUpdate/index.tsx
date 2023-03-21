import React from 'react';

import Header from '../../../../components/header';
import PathHead from '../../../../components/pathHead';
import SideNav from '../../../../components/sideNav';

import { RoleType } from '../../../../shared/types/role';
import { appRouters } from "../../../../shared/urlResources";

import TemplateFormUpdate from './TemplateFormUpdate';

const TemplateFormUpdatePage: React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.FS} pathName={"/" + appRouters.LINK_TO_FS_TEMPLATE_MANAGEMENT}/>
                <div className=''>
                    <PathHead path={"TẠO BIỂU MẪU / Chỉnh sửa form"}/>
                    <TemplateFormUpdate/>
                </div>
            </div>
        </div>
    )
}

export default TemplateFormUpdatePage;