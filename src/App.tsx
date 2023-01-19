import { Routes, Route } from 'react-router-dom';
import FSExpenseStatistics from './pages/faculty/secretary/expenseStatisticsPage';
import FVDExpenseStatistics from './pages/faculty/viceDean/expenseStatisticsPage';
import Home from './pages/homePage';
import Login from './pages/loginPage';
import LoginIndex from './pages/loginPage/LoginIndex';
import PasswordResetIndex from './pages/passwordResetPage';
import Register from './pages/registerPage';
import PersonalInfo from './pages/personalInfo';
import OldAnnouncement from './pages/homePage/OldAnnouncementFull';
import MyTopicPage from './pages/student/myTopicPage';
import { appRouters } from "./shared/urlResources";
import RegisterTopicPage from './pages/student/topicRegisterPage';
import MyRequestPage from './pages/student/myRequestPage';
import TemplatesPage from './pages/student/templatesPage';
import FVDTopicStatistics from './pages/faculty/viceDean/topicStatisticsPage';
import RequestManagement from './pages/faculty/viceDean/requestManagementPage';

function App() {
  
  return (
    <Routes>
      <Route path={appRouters.LINK_TO_HOME_PAGE} element={<Home/>} />
      <Route path={appRouters.LINK_TO_OLD_ANNOUNCEMENT_PAGE} element={<OldAnnouncement/>} />
      <Route path={appRouters.LINK_TO_LOGIN_PAGE} element={<Login/>} />
      <Route path={appRouters.LINK_TO_LOGIN_INDEX_PAGE} element={<LoginIndex/>} />
      <Route path={appRouters.LINK_TO_LOGIN_PASSWORD_RESET_PAGE} element={<PasswordResetIndex/>} />
      <Route path={appRouters.LINK_TO_REGISTER_PAGE} element={<Register/>} />
      <Route path={appRouters.LINK_TO_PERSONAL_INFO_PAGE} element={<PersonalInfo/>} />
      // Student

      <Route path={appRouters.LINK_TO_MY_TOPIC_PAGE} element={<MyTopicPage/>} />
      <Route path={appRouters.LINK_TO_REGISTER_TOPIC_PAGE} element={<RegisterTopicPage/>} />
      <Route path={appRouters.LINK_TO_MY_REQUEST_PAGE} element={<MyRequestPage/>} />
      <Route path={appRouters.LINK_TO_VIEW_TEMPLATES_PAGE} element={<TemplatesPage/>} />

      <Route path={appRouters.LINK_TO_FVD_EXPENSE_STATISTIC} element={<FVDExpenseStatistics/>} />
      <Route path={appRouters.LINK_TO_FVD_TOPIC_STATISTIC} element={<FVDTopicStatistics/>} />
      <Route path={appRouters.LINK_TO_REQUEST_MANAGEMENT} element={<RequestManagement/>} />

      <Route path={appRouters.LINK_TO_FS_EXPENSE_STATISTIC} element={<FSExpenseStatistics />} />
    </Routes>
  );
}

export default App;