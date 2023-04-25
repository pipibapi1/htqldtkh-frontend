import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { store } from '../../../../store';

import RowTable from './RowTable';
import TopicDetailModal from './TopicDetailModal';
import RequestList from './RequestList';

describe("request management page test", () => {
    describe('RowTable', () => {
      test('should display table row with correct props', () => {
        const mockProps = {
            index: 1,
            requestId: 'request-123',
            requestType: 'Type 1',
            requestStatus: 'Chờ xét duyệt',
            topicName: 'Topic 1',
            topicRegister: 'Register 1',
            createdDate: '2022-04-21T00:00:00.000Z',
            additionalInfor: 'Additional Info 1',
            currentPage: 1,
            approveARequest: jest.fn(),
            refuseARequest: jest.fn(),
            topicId: 'topic-123',
          };
        render(
            <Provider store={store}>
                <RowTable {...mockProps} />
            </Provider>
        );
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByText('Type 1')).toBeInTheDocument();
        expect(screen.getByText('Chờ xét duyệt')).toBeInTheDocument();
        expect(screen.getByText('Topic 1')).toBeInTheDocument();
        expect(screen.getByText('Register 1')).toBeInTheDocument();
        expect(screen.getByText('21/04/2022')).toBeInTheDocument();
        expect(screen.getByText('Additional Info 1')).toBeInTheDocument();
        expect(screen.getByText('Duyệt')).toBeInTheDocument();
        expect(screen.getByText('Từ chối')).toBeInTheDocument();
      });
    
      test('should call approveARequest function when "Duyệt" button is clicked', () => {
        const mockProps = {
            index: 1,
            requestId: 'request-123',
            requestType: 'Type 1',
            requestStatus: 'Chờ xét duyệt',
            topicName: 'Topic 1',
            topicRegister: 'Register 1',
            createdDate: '2022-04-21T00:00:00.000Z',
            additionalInfor: 'Additional Info 1',
            currentPage: 1,
            approveARequest: jest.fn(),
            refuseARequest: jest.fn(),
            topicId: 'topic-123',
          };
        render(
            <Provider store={store}>
                <RowTable {...mockProps} />
            </Provider>
        );
        const approveButton = screen.getByTestId('approve-button');
        userEvent.click(approveButton);
        expect(mockProps.approveARequest).toHaveBeenCalledWith('request-123');
      });
    
      test('should call refuseARequest function when "Từ chối" button is clicked', () => {
        const mockProps = {
            index: 1,
            requestId: 'request-123',
            requestType: 'Type 1',
            requestStatus: 'Chờ xét duyệt',
            topicName: 'Topic 1',
            topicRegister: 'Register 1',
            createdDate: '2022-04-21T00:00:00.000Z',
            additionalInfor: 'Additional Info 1',
            currentPage: 1,
            approveARequest: jest.fn(),
            refuseARequest: jest.fn(),
            topicId: 'topic-123',
          };
        render(
            <Provider store={store}>
                <RowTable {...mockProps} />
            </Provider>
        );
        const refuseButton = screen.getByTestId('decline-button');
        userEvent.click(refuseButton);
        expect(mockProps.refuseARequest).toHaveBeenCalledWith('request-123');
      });
    });

    describe('TopicDetailModal', () => {
        test('renders topic detail modal', () => {
            const onClose = jest.fn();
            const topicId = '1';
        
            render(
                <Provider store={store}>
                    <TopicDetailModal isVisible={true} onClose={onClose} topicId={topicId} />
                </Provider>
            );
        
            const topicGivenId = screen.getByText(/Chưa được cấp/i);
            expect(topicGivenId).toBeInTheDocument();
        
            const topicType = screen.getByText('initialType');
            expect(topicType).toBeInTheDocument();
        });
    });

    describe('RequestsTable', () => {
        test('renders correctly with no periods', () => {
          render(
            <Provider store={store}>
                <RequestList />
            </Provider>
          );
      
          expect(screen.getByText('Không có đợt đăng ký')).toBeInTheDocument();
          expect(screen.queryByText('Loại yêu cầu:')).not.toBeInTheDocument();
          expect(screen.queryByText('Trạng thái:')).not.toBeInTheDocument();
        });
      });
});

