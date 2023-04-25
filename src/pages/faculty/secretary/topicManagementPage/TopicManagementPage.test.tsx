import { render, screen } from '@testing-library/react';
import RowTable from './topicListPage/RowTable';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from '../../../../store';

describe("topic management page", () => {
    describe('RowTable', () => {
      const props = {
        index: 0,
        _id: '1',
        topicGivenId: '001',
        topicName: 'Topic Name',
        topicType: 'Type',
        topicStatus: 'Status',
        topicExtensionStatus: 'Extension Status',
        createdDate: '2022-01-01',
        time: '10:00 AM',
        period: '30',
        currentPage: 1,
        startTime: '2022-01-02 10:00 AM',
        endTime: '2022-01-02 11:00 AM',
        productId: '1',
        student: {
          _id: '1',
          name: 'John Doe',
          studentId: '123',
          educationType: 'Education Type',
          gender: 'Male',
          email: 'john.doe@example.com',
          phoneNumber: '123456789',
          birthDate: '1990-01-01'
        }
      };
    
      test('renders the component with the correct props', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(`#${props.index}`)).toBeInTheDocument();
        expect(screen.getByText(props.topicGivenId)).toBeInTheDocument();
        expect(screen.getByText(props.topicName)).toBeInTheDocument();
        expect(screen.getByText(props.topicType)).toBeInTheDocument();
        expect(screen.getByText(props.topicStatus)).toBeInTheDocument();
        expect(screen.getByText(props.topicExtensionStatus)).toBeInTheDocument();
        expect(screen.getByText(props.student.name)).toBeInTheDocument();
        expect(screen.getByText('Chi tiết')).toBeInTheDocument();
        expect(screen.getByText('Sản phẩm')).toBeInTheDocument();
        expect(screen.getByText('Giấy tờ liên quan')).toBeInTheDocument();
        expect(screen.getByText('Chức năng khác')).toBeInTheDocument();
      });
    
      test('renders the correct index number', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(`#${props.index}`)).toBeInTheDocument();
      });
    
      test('displays the correct topic given id', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(props.topicGivenId)).toBeInTheDocument();
      });
    
      test('displays the correct topic name', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(props.topicName)).toBeInTheDocument();
      });
    
      test('displays the correct topic type', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(props.topicType)).toBeInTheDocument();
      });
    
      test('displays the correct topic status', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(props.topicStatus)).toBeInTheDocument();
      });
    
      test('displays the correct topic extension status', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(props.topicExtensionStatus)).toBeInTheDocument();
      });
    
      test('displays the correct student name', () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <RowTable {...props} />
                </HashRouter>
            </Provider>
        );
        expect(screen.getByText(props.student.name)).toBeInTheDocument();
      });
    });
})

