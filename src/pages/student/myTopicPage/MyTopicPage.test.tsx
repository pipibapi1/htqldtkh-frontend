import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { RootState } from "../../../store";

import MyTopicList from './MyTopicList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
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

describe('MyTopicList component', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter>
            <MyTopicList />
          </MemoryRouter>
        </Provider>
      );
    });
  });

  test('should render the page title', () => {
    expect(screen.getByText('Nhập đề tài mới')).toBeInTheDocument();
  });

  test('should change filter when selecting a type', async () => {
    const typeSelect = screen.getByTestId('topic-type-select') as HTMLSelectElement;
    const allOption = typeSelect.querySelector('option[value=""]') as HTMLOptionElement;
    const essayOption = typeSelect.querySelector('option[value="Chính quy"]') as HTMLOptionElement;

    expect(allOption.selected).toBe(true);

    await act(async () => {
      fireEvent.change(typeSelect, { target: { value: 'Chính quy' } });
    });

    expect(essayOption.selected).toBe(true);
  });

  test('should change filter when selecting a status', async () => {
    const statusSelect = screen.getByTestId('topic-status-select') as HTMLSelectElement;
    const allOption = statusSelect.querySelector('option[value=""]') as HTMLOptionElement;
    const doneOption = statusSelect.querySelector('option[value="Đã hoàn thành"]') as HTMLOptionElement;

    expect(allOption.selected).toBe(true);

    await act(async () => {
      fireEvent.change(statusSelect, { target: { value: 'Đã hoàn thành' } });
    });

    expect(doneOption.selected).toBe(true);
  });
});

