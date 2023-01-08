import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import PasswordResetPanel from './PasswordResetPanel';

const PasswordIndex: React.FC = (props: any) => {
    return (
        <div>
            <Header isLogin={false} isAccountServicePage={true}/>
            <PasswordResetPanel />
            <Footer />
        </div>
    );
}

export default PasswordIndex;