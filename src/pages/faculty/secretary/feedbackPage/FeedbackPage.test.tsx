import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Feedback from './Feedback';
import { store } from '../../../../store';

import { useLocation } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));


describe('Feedback', () => {

  test('renders the component', () => {
    (useLocation as jest.Mock).mockReturnValue({
        pathname: "/example",
        search: "?example=123",
        hash: "#example",
        state: { topic:{
            name: "Topic 1",
            type: "Topic Type 1",
            topicGivenId: "ABC123",
            student: {
                name: "quan tran"
            }
        } },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Feedback />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Tên đề tài:')).toBeInTheDocument();
    expect(screen.getByText('Topic 1')).toBeInTheDocument();
    expect(screen.getByText('Mã đề tài:')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Loại đề tài:')).toBeInTheDocument();
    expect(screen.getByText('Topic Type 1')).toBeInTheDocument();
  });
});
