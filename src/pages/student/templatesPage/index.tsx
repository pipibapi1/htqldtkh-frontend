import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';

import { RoleType } from '../../../shared/types/role';

import TemplateList from './TemplateList';

const TemplatesPage:React.FC = () => {
    const location = useLocation();
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={RoleType.Student} pathName={location.pathname}/>
                <div className=''>
                    <PathHead path={"XEM BIỂU MẪU"}/>
                    <TemplateList />
                </div>
            </div>
        </div>
    )
}

export default TemplatesPage;