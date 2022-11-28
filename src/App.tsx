import { Routes, Route } from 'react-router-dom';
import Home from './pages/homePage';
import Login from './pages/loginPage';
import Register from './pages/registerPage';
import MyTopicPage from './pages/student/myTopicPage';
import { appRouters } from "./shared/urlResources";

function App() {
  return (
    <Routes>
      <Route path={appRouters.LINK_TO_HOME_PAGE} element={<Home/>} />
      <Route path={appRouters.LINK_TO_LOGIN_PAGE} element={<Login/>} />
      <Route path={appRouters.LINK_TO_REGISTER_PAGE} element={<Register/>} />
      <Route path={appRouters.LINK_TO_MY_TOPIC_PAGE} element={<MyTopicPage/>} />
    </Routes>
  );
}

export default App;
