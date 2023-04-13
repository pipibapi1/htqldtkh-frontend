import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from '../../../store';

import TopicDetail from './TopicDetail';

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
