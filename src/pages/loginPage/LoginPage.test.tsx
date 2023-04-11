import { render, fireEvent, waitFor} from '@testing-library/react';
import { Provider } from "react-redux"
import { store } from "../../store";

import LoginPanel from './LoginPanel';

// Import the module that exports the useLocation hook
import { HashRouter, useLocation } from 'react-router-dom';

// Mock the useLocation hook
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
  

describe('test LoginPanel', () => {
  let component:any;

  beforeEach(() => {
    const mockLocation = {
        pathname: '/loginPanel', 
        search: '', 
        hash: '', 
        state: {role: 'sinh viên'}, 
        key: '23ey2va1'
    };
    (useLocation as jest.Mock)
        .mockReturnValue(mockLocation)
        
    
    component = render(
      <Provider store={store}>
        <HashRouter>
            <LoginPanel/>
        </HashRouter>
      </Provider>
    );
  });

  test('should render without errors', async () => {
    const { getByTestId, getByPlaceholderText } = component;
    const usernameInput = getByPlaceholderText('Tên đăng nhập');
    const passwordInput = getByPlaceholderText('Mật khẩu');
    const loginButton = getByTestId('login-button');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('should show warning message when the username or password is empty', async () => {
    const { getByTestId, getByPlaceholderText, getByText } = component;
    const usernameInput = getByPlaceholderText('Tên đăng nhập');
    const passwordInput = getByPlaceholderText('Mật khẩu');
    const loginButton = getByTestId('login-button');

    fireEvent.change(usernameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      const warningMessage = getByText(/Bạn không được để trống tên đăng nhập/i);
      expect(warningMessage).toBeInTheDocument();
    });
  });

});