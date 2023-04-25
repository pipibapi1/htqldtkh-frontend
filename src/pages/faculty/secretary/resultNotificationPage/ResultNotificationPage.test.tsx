import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../../../store';

import ResultNotification from './ResultNotification';
import { useLocation } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe('ResultNotification', () => {
  let component: any;

  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
        pathname: "/example",
        search: "?example=123",
        hash: "#example",
        state: { topic:{
            name: "Topic 1",
            student: {
                name: "quan tran"
            }
        } },
    });
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <ResultNotification />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders the back icon', () => {
    const backIcon = component.container.querySelector('.p-3 img');
    expect(backIcon).toBeInTheDocument();
  });

  test('displays topic name', () => {
    const topicNameValue = screen.getByText('Topic 1');
    expect(topicNameValue).toBeInTheDocument();
  });

  test('displays topic given ID', () => {
    const topicGivenId = screen.getByText('Mã đề tài:');
    expect(topicGivenId).toBeInTheDocument();
  });

  test('displays type of result as xét duyệt by default', () => {
    const resultTypeValue = screen.getByDisplayValue('Xét duyệt');
    expect(resultTypeValue).toBeInTheDocument();
  });

  test('displays warning if content is empty when user submits', () => {
    const submitButton = screen.getByRole('button', { name: 'Gửi' });
    fireEvent.click(submitButton);
    const warningMessage = screen.getByText('Phần nội dung không được bỏ trống');
    expect(warningMessage).toBeInTheDocument();
  });
});