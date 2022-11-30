import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import RegisterPanel from './RegisterPanel';

const Register: React.FC = (props: any) => {
    return (
        <div>
            <Header isLogin={false} isAccountServicePage={true}/>
            <RegisterPanel />
            <Footer />
        </div>
    );
}

export default Register;