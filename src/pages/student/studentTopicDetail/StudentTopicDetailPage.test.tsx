import { render } from '@testing-library/react';
import TopicDetail from './TopicDetail';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { HashRouter } from 'react-router-dom';
  

describe('test Student Topic Detail Page', () => {

  test('renders topic information correctly', () => {

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
