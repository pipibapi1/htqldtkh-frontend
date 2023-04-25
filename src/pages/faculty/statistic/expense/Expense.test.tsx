import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import RowTable from './topicListPage/RowTable';
import ExpenseStatistic from './ExpenseStatistic';
import { store } from '../../../../store';

describe("expense statistic test", () => {
    test('should render the component correctly', () => {
        const props = {
            index: 1,
            topicId: '1',
            topicName: 'Test topic',
            topicType: 'Test type',
            topicStatus: 'Test status',
            extensionStatus: 'Test extension status',
            topicRegister: 'Test topic register',
            date: '2022-01-01',
            currentPage: 1,
            expense:1000000
        };
        render(<RowTable {...props} />);
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Test topic')).toBeInTheDocument();
        expect(screen.getByText('Test type')).toBeInTheDocument();
        expect(screen.getByText('1,000,000 VND')).toBeInTheDocument();
        expect(screen.getByText('Test topic register')).toBeInTheDocument();
        expect(screen.getByText('01/01/2022')).toBeInTheDocument();
    });

    test('should display the correct labels', () => {
        render(
            <Provider store={store}>
                <ExpenseStatistic />
            </Provider>
        );
    
        expect(screen.getByText('Thống kê kinh phí sử dụng các đợt')).toBeInTheDocument();
        expect(screen.getByText('Từ năm')).toBeInTheDocument();
        expect(screen.getByText('đến năm')).toBeInTheDocument();
        expect(screen.getByText('Chi tiết kinh phí theo đợt')).toBeInTheDocument();
        expect(screen.getByText('Năm:')).toBeInTheDocument();
      });
})

