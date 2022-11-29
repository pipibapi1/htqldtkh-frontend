import React from 'react';
import Footer from '../../../../components/footer';
import Header from '../../../../components/header';
import SideNav from '../../../../components/sideNav';

const FSExpenseStatistics: React.FC = () => {
    return (
        <div className=''>
            <Header isLogin={true} isAccountServicePage={false}/>
            <Footer />
        </div>
    )
}

export default FSExpenseStatistics;