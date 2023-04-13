import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../../store';

import { Template } from '../../../shared/interfaces/templateInterface';

import TemplateList from './TemplateList';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}));

describe('test Template List Page', () => {
  test('should render template list', () => {
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
        formId: ""
      }
    ];
    const useStateMock = jest.spyOn(React, 'useState').mockReturnValue([templates, jest.fn()]);
    render(
      <Provider store={store}>
        <TemplateList />
      </Provider>
    );
    const templateList = screen.getByText('Biểu mẫu đề tài cấp Sinh viên');
    expect(templateList).toBeInTheDocument();

    const template1 = screen.getByText('T001 - Template 1 - (đang được dùng)');
    expect(template1).toBeInTheDocument();

    const template2 = screen.getByText('T002 - Template 2 - (không được dùng)');
    expect(template2).toBeInTheDocument();
    useStateMock.mockRestore();
  });
});
