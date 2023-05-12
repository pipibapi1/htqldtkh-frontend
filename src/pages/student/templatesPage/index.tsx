import React from 'react';

import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';

import { appRouters } from '../../../shared/urlResources';
import { RoleType } from '../../../shared/types/role';

import TemplateList from './TemplateList';

const TemplatesPage:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={"/" + appRouters.LINK_TO_VIEW_TEMPLATES_PAGE}/>
                <div className=''>
                    <PathHead path={"XEM BIỂU MẪU"}/>
                    <TemplateList />
                </div>
            </div>
        </div>
    )
}

export default TemplatesPage;