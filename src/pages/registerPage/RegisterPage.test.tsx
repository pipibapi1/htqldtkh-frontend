import { render, fireEvent, screen } from '@testing-library/react';
import RegisterPanel from './RegisterPanel';
import { Provider } from "react-redux"
import { store } from "../../store";
import { HashRouter } from 'react-router-dom';

describe('Register Panel renders correctly', () => {
  it('should display an error message when an invalid email is entered', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <RegisterPanel />
        </HashRouter>
    </Provider>
    );
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    const errorMessage = screen.getByText(/Emai không đúng định dạng/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not display an error message when a valid email is entered', () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <RegisterPanel />
        </HashRouter>
    </Provider>
    );
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'valid_email@example.com' } });
    const errorMessage = screen.queryByText(/Emai không đúng định dạng/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
