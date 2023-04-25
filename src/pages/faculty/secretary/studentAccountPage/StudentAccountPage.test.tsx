import { render, fireEvent, screen } from '@testing-library/react';
import Modal from './Modal';
import { Provider } from 'react-redux';
import { store } from '../../../../store';

describe("student account management page", () => {
    describe("test modal", () => {
        const student = {
            _id: '1',
            name: 'John Doe',
            studentId: '123',
            gender: 'Male',
            birthDate: new Date().toISOString()
          };
          
          test('Modal renders correctly', () => {
            render(
                <Provider store={store}>
                    <Modal isVisible={true} onClose={() => {}} student={student} />);
                </Provider>
            );
            expect(screen.getByText('Thông tin chi tiết tài khoản')).toBeInTheDocument();
          });
          
          test('Clicking outside the Modal should trigger onClose', () => {
            const onClose = jest.fn();
            render(
                <Provider store={store}>
                    <Modal isVisible={true} onClose={onClose} student={student} />);
                </Provider>
            );
            fireEvent.click(screen.getByTestId('wrapper'));
            expect(onClose).toHaveBeenCalledTimes(2);
          });
    })
      
})