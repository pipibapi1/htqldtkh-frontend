import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { RootState } from "../../../store";

import TopicDetail from './TopicDetail';
import StudentTopicDetail from '.';

const middlewares = [thunk];
const mockStore = configureMockStore<RootState>(middlewares);

describe('test Student Topic Detail Page', () => {
  test('renders topic information correctly', () => {
    const initialState: RootState = {
      auth: {
          isLoggedIn: false,
          user: null,
      },
      message: {message: ""},
      topicCondition: {
          leaderCondition: "",
          expression: "",
          instructorCondition: "",
      }
    };
    const store = mockStore(initialState);
    const { getByText } = render(
        <Provider store={store}>
            <HashRouter>
                <TopicDetail/>
            </HashRouter>
        </Provider>
    );
    expect(getByText('Thông tin chủ nhiệm đề tài:')).toBeInTheDocument();
  });

  test('renders student topic detail page properly', () => {
    const initialState: RootState = {
      auth: {
          isLoggedIn: true,
          user: {
              _id: '123',
              role: 'sinh viên',
          },
      },
      message: {message: ""},
      topicCondition: {
          leaderCondition: "",
          expression: "",
          instructorCondition: "",
      }
    };
    const store = mockStore(initialState); 
    const { getByText } = render(
      <Provider store={store}>
        <HashRouter>
            <StudentTopicDetail />
        </HashRouter>
      </Provider>
    );
    expect(getByText('ĐỀ TÀI CỦA TÔI / Chi tiết')).toBeInTheDocument();
  });
});
