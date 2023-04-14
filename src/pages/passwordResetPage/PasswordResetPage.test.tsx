import { render, fireEvent, screen } from '@testing-library/react';
import { HashRouter, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from "../../store";

import PasswordResetPanel from './PasswordResetPanel';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue({
        pathname: '/loginPanel', 
        search: '', 
        hash: '', 
        state: {role: 'sinh viên'}, 
        key: '23ey2va1'
    })
}));


describe('PasswordResetPanel', () => {
  beforeEach(() => {
    const mockLocation = {
      pathname: '/loginPanel', 
      search: '', 
      hash: '', 
      state: {role: 'sinh viên'}, 
      key: '23ey2va1'
    };
    (useLocation as jest.Mock).mockReturnValue(mockLocation)
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <PasswordResetPanel />
        </HashRouter>
      </Provider>
    );
  });

  test('renders email input', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <PasswordResetPanel />
        </HashRouter>
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    expect(emailInput).toBeInTheDocument();
  });

  test('renders warning when email is empty on form submission', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <PasswordResetPanel />
        </HashRouter>
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: '' } });
    const resetButton = screen.getByTestId("reset-button-id");
    fireEvent.click(resetButton);
    const warningMessage = await screen.findByText('Bạn không được để trống email');
    expect(warningMessage).toBeInTheDocument();
  });

  test('renders warning when email is not valid on form submission', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <PasswordResetPanel />
        </HashRouter>
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'not-a-valid-email' } });
    const resetButton = screen.getByTestId("reset-button-id");
    fireEvent.click(resetButton);
    const warningMessage = await screen.findByText('Email không đúng định dạng');
    expect(warningMessage).toBeInTheDocument();
  });
});

