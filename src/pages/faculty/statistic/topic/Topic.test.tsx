import { render, screen } from '@testing-library/react';

import { TopicStatusEnum } from '../../../../shared/types/topicStatus';

import { TopicStatusCard } from './TopicStatistic';

import RowTable from './topicListPage/RowTable';

describe("topic statistic test", () => {
    test('renders correct content for NEW status', () => {
      render(
        <TopicStatusCard status={TopicStatusEnum.NEW} quantity={5} />
      );
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('Số đề tài')).toBeInTheDocument();
      expect(screen.getByText('tạo mới')).toBeInTheDocument();
      expect(screen.getByTestId('new-icon')).toHaveAttribute('src', 'new.png');
      expect(screen.getByTestId('card')).toHaveStyle('background-color: #4169E1; opacity: 0.6');
    });

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
        };
        render(<RowTable {...props} />);
        expect(screen.getByText('#1')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('Test topic')).toBeInTheDocument();
        expect(screen.getByText('Test type')).toBeInTheDocument();
        expect(screen.getByText('Test status')).toBeInTheDocument();
        expect(screen.getByText('Test extension status')).toBeInTheDocument();
        expect(screen.getByText('Test topic register')).toBeInTheDocument();
        expect(screen.getByText('01/01/2022')).toBeInTheDocument();
      });
})

