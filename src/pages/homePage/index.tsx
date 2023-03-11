import React from 'react';
import { useSelector } from "react-redux";

import { RootState } from '../../store';

import Footer from '../../components/footer';
import Header from '../../components/header';

import MainHomePageContent from './HomePageContent';
import Announcement from './Announcement';


const Home: React.FC = () => {

    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    return (
        <div className=''>
            <Header isLogin={isLoggedIn} isAccountServicePage={false}/>
            <MainHomePageContent/>
            <Announcement/>
            <Footer/>
        </div>
    );
}

export default Home;