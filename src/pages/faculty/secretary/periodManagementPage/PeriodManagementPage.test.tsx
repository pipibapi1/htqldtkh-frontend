import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { HashRouter } from 'react-router-dom';

describe("period management", () => {
    describe('Modal', () => {
      test('renders Modal component', () => {
        const onClose = jest.fn();
        render(
            <Provider store={store}>
                <HashRouter>
                    <Modal isVisible={true} onClose={onClose} year={new Date("2023-08-01T00:00:00.000Z")} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText('Thêm đợt đăng ký mới cho năm 2023')).toBeInTheDocument();
      });
    
      test('updates title state when typing a title', () => {
        const onClose = jest.fn();
        render(
            <Provider store={store}>
                <HashRouter>
                    <Modal isVisible={true} onClose={onClose} year={new Date()} />
                </HashRouter>
            </Provider>
        );
        const input = screen.getByTestId('name-input') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'New Period' } });
        expect(input.value).toBe('New Period');
      });
    
    });
})

