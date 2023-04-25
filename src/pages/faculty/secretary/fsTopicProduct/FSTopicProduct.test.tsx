import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import TopicProduct from './TopicProduct';
import { store } from '../../../../store';

describe('TopicProduct', () => {
  test('renders without errors', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <TopicProduct />
        </Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('Tình trạng sản phẩm')).toBeInTheDocument();
  });
});
