import { Routes, Route } from 'react-router-dom';
import FSExpenseStatistics from './pages/faculty/secretary/expenseStatisticsPage';
import FVDExpenseStatistics from './pages/faculty/viceDean/expenseStatisticsPage';
import Home from './pages/homePage';
import Login from './pages/loginPage';
import LoginIndex from './pages/loginPage/LoginIndex';
import PasswordIndex from './pages/loginPage/PasswordIndex';
import Register from './pages/registerPage';
import MyTopicPage from './pages/student/myTopicPage';
import { appRouters } from "./shared/urlResources";

function App() {
  return (
    <Routes>
      <Route path={appRouters.LINK_TO_HOME_PAGE} element={<Home/>} />
      <Route path={appRouters.LINK_TO_LOGIN_PAGE} element={<Login/>} />
      <Route path={appRouters.LINK_TO_LOGIN_INDEX_PAGE} element={<LoginIndex/>} />
      <Route path={appRouters.LINK_TO_LOGIN_PASSWORD_PAGE} element={<PasswordIndex/>} />
      <Route path={appRouters.LINK_TO_REGISTER_PAGE} element={<Register/>} />
      <Route path={appRouters.LINK_TO_MY_TOPIC_PAGE} element={<MyTopicPage/>} />
      <Route path={appRouters.LINK_TO_FVD_EXPENSE_STATISTIC} element={<FVDExpenseStatistics/>} />
      <Route path={appRouters.LINK_TO_FS_EXPENSE_STATISTIC} element={<FSExpenseStatistics />} />
    </Routes>
  );
}

export default App;
