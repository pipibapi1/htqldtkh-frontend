import React from 'react';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import SideNav from '../../../components/sideNav';
import PathHead from '../../../components/pathHead';
import TemplateList from './TemplateList';

const TemplatesPage:React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <div className='flex'>
                <SideNav role={"student"}/>
                <div className=''>
                    <PathHead path={"XEM BIỂU MẪU"}/>
                    <TemplateList />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TemplatesPage;