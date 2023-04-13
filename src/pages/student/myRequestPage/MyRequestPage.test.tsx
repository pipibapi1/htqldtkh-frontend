import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from '../../../store';

import { Topic } from '../../../shared/interfaces/topicInterface';
import { RequestStatus } from '../../../shared/types/requestStatus';

import RowTable from './RowTable';
import TopicDetailModal from './TopicDetailModal';
import Modal from './Modal';
import MyRequestList from './MyRequestList';


describe('test my request page', () => {
  test('should display warning toast when no topic is selected', () => {
    const myTopics: Topic[] = [];
    render(
        <Provider store={store}>
            <Modal isVisible={true} onClose={() => {}} myTopics={myTopics} />
        </Provider>
    );
    const addButton = screen.getByRole('button', { name: /Tạo yêu cầu/i });
    fireEvent.click(addButton);
    expect(screen.getByText(/vui lòng chọn đề tài/i)).toBeInTheDocument();
  });

  test('should display the request list', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
            <MyRequestList />
        </HashRouter>
      </Provider>
    );
    expect(screen.getByText('Tạo yêu cầu')).toBeInTheDocument();
    expect(screen.getByText('Loại yêu cầu:')).toBeInTheDocument();
    expect(screen.getByText('Trạng thái:')).toBeInTheDocument();
  });

  test('renders the Row Table', () => {
    const mockData = {
      index: 0,
      requestId: '1',
      requestType: 'Type',
      requestStatus: RequestStatus.WAIT_APPROVAL,
      createdDate: '2022-04-13T18:25:43.511Z',
      topicName: 'Topic',
      additionalInfor: 'Info',
      currentPage: 1,
      periodValue: '2022-04-13T18:25:43.511Z',
      topicId: '1'
    };
    render(
      <Provider store={store}>
        <RowTable {...mockData} />
      </Provider>
    );
    expect(screen.getByText(`#${mockData.index}`)).toBeInTheDocument();
    expect(screen.getByText(mockData.requestType)).toBeInTheDocument();
    expect(screen.getByText(mockData.requestStatus)).toBeInTheDocument();
    expect(screen.getByText(mockData.topicName)).toBeInTheDocument();
    expect(screen.getByText(mockData.additionalInfor)).toBeInTheDocument();
    expect(screen.getByText('Xóa')).toBeInTheDocument();
  });

  test('renders with topic name', () => {
    render(
      <Provider store={store}>
        <TopicDetailModal isVisible={true} onClose={() => {}} topicId="1" />
      </Provider>
    );
    const topicNameElement = screen.getByText(/Example Type/i);
    expect(topicNameElement).toBeInTheDocument();
  });
});