import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { RootState } from "../../../store";
import { Template } from '../../../shared/interfaces/templateInterface';
import TemplateList from './TemplateList';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn()
}));

describe('Template List Page', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore<RootState>(middlewares);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders template list', () => {
    const initialState: RootState = {
      auth: {
        isLoggedIn: false,
        user: null,
      },
      message: { message: "" },
      topicCondition: {
        leaderCondition: "",
        expression: "",
        instructorCondition: "",
      },
    };
    const store = mockStore(initialState);

    const templates: Template[] = [
      {
        _id: '1',
        name: 'Template 1',
        templateGivenId: 'T001',
        inUse: true,
        forStudent: true,
        createAt: "",
        formId: "",
      },
      {
        _id: '2',
        name: 'Template 2',
        templateGivenId: 'T002',
        inUse: false,
        forStudent: true,
        createAt: "",
        formId: "",
      },
    ];

    const useStateMock = jest.spyOn(React, 'useState').mockReturnValue([
      templates,
      jest.fn(),
    ]);

    render(
      <Provider store={store}>
        <TemplateList />
      </Provider>
    );

    expect(screen.getByText('Biểu mẫu đề tài cấp Sinh viên')).toBeInTheDocument();
    expect(screen.getByText('T001 - Template 1 - (đang được dùng)')).toBeInTheDocument();
    expect(screen.getByText('T002 - Template 2 - (không được dùng)')).toBeInTheDocument();
    
    useStateMock.mockRestore();
  });
});
