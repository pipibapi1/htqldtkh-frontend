import React from 'react';
import Footer from '../../../../components/footer';
import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';

const FVDExpenseStatistics: React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <SideNav role={"fvd"}/>
            <Footer />
        </div>
    )
}

export default FVDExpenseStatistics;