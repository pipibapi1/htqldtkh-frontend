import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import UploadInterface from './UploadInterface';

describe('UploadInterface', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <UploadInterface />
      </Provider>
    );
  });

  test('validates form input before submission', async () => {
    render(
      <Provider store={store}>
        <UploadInterface />
      </Provider>
    );

    const submitButton = screen.getByTestId('upload-button');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Bạn không được để trống phần tiêu đề')).toBeInTheDocument();
    });
  });

});
