import React from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import MainHomePageContent from './HomePageContent';
import Announcement from './Announcement';
import { useSelector } from "react-redux";
import { RootState} from '../../store';



const Home: React.FC = (props: any) => {
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