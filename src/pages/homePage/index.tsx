import React, { useEffect, useState} from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import MainHomePageContent from './HomePageContent';
import Announcement from './Announcement';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from '../../store';
import ThongBao from '../../assets/images/ThongBaoMoiNhat.pdf'
import { getAnnouncementFileAction, getAnnouncementsAction } from '../../actions/announcementAction';

const MAX_INT = "999999";

interface AnnouncementType{
    _id: string;
    title: string;
    fileType: string;
    fileName: string;
    createAt: Date;
    content: string;
}

const Home: React.FC = (props: any) => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const useAppDispatch: () => AppDispatch = useDispatch
    const dispatch = useAppDispatch()

    const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
    const [latestAnnouncement, setLatestAnnouncement] = useState("");
    const [latestAnnouncementId, setLatestAnnouncementId] = useState("");

    useEffect(() => {
        const query = {
            page: "1",
            limit: MAX_INT
        }
        dispatch(getAnnouncementsAction(query))
            .then((data) => {
                setAnnouncements(data?.announcements)
                if(data?.announcements.length > 0){
                    setLatestAnnouncementId(data?.announcements[0]._id);
                    setLatestAnnouncement(process.env.REACT_APP_API_URL + "/api/announcement" + `/${data?.announcements[0]._id}/file`)
                }
            })
            .catch((error) => {

            }) 
    }, []);

    return (
        <div className=''>
            <Header isLogin={isLoggedIn} isAccountServicePage={false}/>
            <MainHomePageContent/>
            <Announcement image = {latestAnnouncement} announcements={announcements} _id={latestAnnouncementId}/>
            <Footer/>
        </div>
    );
}

export default Home;