import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';

const Login: React.FC = (props: any) => {
    return (
        <div>
            <Header isLogin={false} isAccountServicePage={true}/>
            <Footer />
        </div>
    );
}

export default Login;