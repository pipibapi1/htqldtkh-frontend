import React from 'react';
import Header from '../../components/header';

const Login: React.FC = (props: any) => {
    return (
        <Header isLogin={false} isAccountServicePage={true}/>
    );
}

export default Login;