import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { RootState } from "../../../../store";

import TopicDetail from './TopicDetail';

const middlewares = [thunk];
const mockStore = configureMockStore<RootState>(middlewares);

describe('test fs Topic Detail Page', () => {
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
});
