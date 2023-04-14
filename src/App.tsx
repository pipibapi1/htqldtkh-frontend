import { Routes, Route } from 'react-router-dom';
import FSExpenseStatistics from './pages/faculty/secretary/expenseStatisticsPage';
import FVDExpenseStatistics from './pages/faculty/viceDean/expenseStatisticsPage';
import Home from './pages/homePage';
import Login from './pages/loginPage';
import LoginIndex from './pages/loginPage/LoginIndex';
import PasswordResetIndex from './pages/passwordResetPage';
import Register from './pages/registerPage';
import PersonalInfo from './pages/personalInfo';
import OldAnnouncementFull from './pages/homePage/OldAnnouncementFull';
import MyTopicPage from './pages/student/myTopicPage';
import { appRouters } from "./shared/urlResources";
import RegisterTopicPage from './pages/student/topicRegisterPage';
import MyRequestPage from './pages/student/myRequestPage';
import TemplatesPage from './pages/student/templatesPage';
import FVDTopicStatistics from './pages/faculty/viceDean/topicStatisticsPage';
import RequestManagement from './pages/faculty/viceDean/requestManagementPage';
import FSTopicStatistics from './pages/faculty/secretary/topicStatisticsPage';
import StudentAccountManagement from './pages/faculty/secretary/studentAccountPage';
import VicedeanAccountManagement from './pages/faculty/secretary/vicedeanAccountPage';
import FSTopicConditionManagement from './pages/faculty/secretary/topicConditionPage';
import FSUploadAnnouncement from './pages/faculty/secretary/uploadAnnouncementPage';
import FSAllocateExpense from './pages/faculty/secretary/allocateExpensePage';
import StudentTopicDetail from './pages/student/studentTopicDetail';
import StudentTopicProduct from './pages/student/studentTopicProduct';
import StudentTopicPapers from './pages/student/studentTopicPapers';
import PeriodManagementPage from './pages/faculty/secretary/periodManagementPage';
import FSCreateCouncil1 from './pages/faculty/secretary/createCouncilPage/Council1';
import FSCouncil1Detail from './pages/faculty/secretary/createCouncilPage/Council1/CouncilDetail';
import FSCreateCouncil2 from './pages/faculty/secretary/createCouncilPage/Council2';
import FSCouncil2Detail from './pages/faculty/secretary/createCouncilPage/Council2/CouncilDetail';
import TopicManagementPage from './pages/faculty/secretary/topicManagementPage';
import FSTopicDetail from './pages/faculty/secretary/fsTopicDetail';
import FSTopicProduct from './pages/faculty/secretary/fsTopicProduct';
import FSTopicPapers from './pages/faculty/secretary/fsTopicPapers';
import FSResultNotificationPage from './pages/faculty/secretary/resultNotificationPage';
import FSFeedbackPage from './pages/faculty/secretary/feedbackPage';
import TemplateManagementPage from './pages/faculty/secretary/templateManagementPage';
import TemplateFormCreationPage from './pages/faculty/secretary/templateFormCreation';
import TemplateFormUpdatePage from './pages/faculty/secretary/templateFormUpdate';
import StudentTopicPaperCreation from './pages/student/studentTopicPaperCreation';

function App() {
  
  return (
    <Routes>
      <Route path={appRouters.LINK_TO_HOME_PAGE} element={<Home/>} />
      <Route path={appRouters.LINK_TO_OLD_ANNOUNCEMENT_PAGE + '/:announcementId'} element={<OldAnnouncementFull/>} />
      <Route path={appRouters.LINK_TO_LOGIN_PAGE} element={<Login/>} />
      <Route path={appRouters.LINK_TO_LOGIN_INDEX_PAGE} element={<LoginIndex/>} />
      <Route path={appRouters.LINK_TO_LOGIN_PASSWORD_RESET_PAGE} element={<PasswordResetIndex/>} />
      <Route path={appRouters.LINK_TO_REGISTER_PAGE} element={<Register/>} />
      <Route path={appRouters.LINK_TO_PERSONAL_INFO_PAGE} element={<PersonalInfo/>} />

      <Route path={appRouters.LINK_TO_MY_TOPIC_PAGE} element={<MyTopicPage/>} />
        <Route path={appRouters.LINK_TO_STUDENT_TOPIC_DETAIL} element={<StudentTopicDetail/>} />
        <Route path={appRouters.LINK_TO_STUDENT_TOPIC_PRODUCT} element={<StudentTopicProduct/>} />
        <Route path={appRouters.LINK_TO_STUDENT_TOPIC_PAPERS} element={<StudentTopicPapers/>} />
          <Route path={appRouters.LINK_TO_STUDENT_TOPIC_PAPER_CREATION} element={<StudentTopicPaperCreation/>} />
      <Route path={appRouters.LINK_TO_REGISTER_TOPIC_PAGE} element={<RegisterTopicPage/>} />
      <Route path={appRouters.LINK_TO_MY_REQUEST_PAGE} element={<MyRequestPage/>} />
      <Route path={appRouters.LINK_TO_VIEW_TEMPLATES_PAGE} element={<TemplatesPage/>} />

      <Route path={appRouters.LINK_TO_FVD_EXPENSE_STATISTIC} element={<FVDExpenseStatistics/>} />
      <Route path={appRouters.LINK_TO_FVD_TOPIC_STATISTIC} element={<FVDTopicStatistics/>} />
      <Route path={appRouters.LINK_TO_REQUEST_MANAGEMENT} element={<RequestManagement/>} />

      <Route path={appRouters.LINK_TO_FS_EXPENSE_STATISTIC} element={<FSExpenseStatistics />} />
      <Route path={appRouters.LINK_TO_FS_TOPIC_STATISTIC} element={<FSTopicStatistics/>} />
      <Route path={appRouters.LINK_TO_STUDENT_ACCOUNT_MANAGEMENT} element={<StudentAccountManagement/>} />
      <Route path={appRouters.LINK_TO_VICEDEAN_ACCOUNT_MANAGEMENT} element={<VicedeanAccountManagement/>} />
      <Route path={appRouters.LINK_TO_FS_TOPIC_MANAGEMENT} element={<TopicManagementPage />} />
        <Route path={appRouters.LINK_TO_FS_TOPIC_DETAIL} element={<FSTopicDetail/>} />
        <Route path={appRouters.LINK_TO_FS_TOPIC_PRODUCT} element={<FSTopicProduct/>} />
        <Route path={appRouters.LINK_TO_FS_TOPIC_PAPERS} element={<FSTopicPapers/>} />
        <Route path={appRouters.LINK_TO_FS_RESULT_NOTIFICATION} element={<FSResultNotificationPage/>} />
        <Route path={appRouters.LINK_TO_FS_FEEDBACK} element={<FSFeedbackPage/>} />
      <Route path={appRouters.LINK_TO_FS_TEMPLATE_MANAGEMENT} element={<TemplateManagementPage/>} />
        <Route path={appRouters.LINK_TO_FS_FORM_CREATION} element={<TemplateFormCreationPage/>} />
        <Route path={appRouters.LINK_TO_FS_FORM_UPDATE} element={<TemplateFormUpdatePage/>} />
      <Route path={appRouters.LINK_TO_PERIOD_MANAGEMENT} element={<PeriodManagementPage/>} />
      <Route path={appRouters.LINK_TO_FS_TOPIC_CONDITION_MANAGEMENT} element={<FSTopicConditionManagement/>} />
      <Route path={appRouters.LINK_TO_FS_UPLOAD_ANNOUNCEMENT} element={<FSUploadAnnouncement/>} />
      <Route path={appRouters.LINK_TO_FS_REVIEW_COUNCIL} element={<FSCreateCouncil1/>} />
      <Route path={appRouters.LINK_TO_FS_REVIEW_COUNCIL_DETAIL} element={<FSCouncil1Detail/>} />
      <Route path={appRouters.LINK_TO_FS_ACCEPTANCE_COUNCIL} element={<FSCreateCouncil2/>} />
      <Route path={appRouters.LINK_TO_FS_ACCEPTANCE_COUNCIL_DETAIL} element={<FSCouncil2Detail/>} />
      <Route path={appRouters.LINK_TO_FS_ALLOCATE_EXPENSE} element={<FSAllocateExpense/>} />
    </Routes>
  );
}
 
export default App;
