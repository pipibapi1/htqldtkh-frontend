import { render, screen, fireEvent } from '@testing-library/react';
import RowTable from './TopicListComponent/RowTable';

describe("allocated expense", () => {
    describe("topic list component", () => {
        describe('RowTable', () => {
          const topic = {
            _id: '1',
            name: 'topic 1',
            type: 'type 1',
            startTime: '',
            endTime: '',
            isExtended: false,
            extensionTime: 0,
            status: '', 
            period: '',
            productId: '',
            studentId: '',
            creationDate: '',
            topicGivenId: '',
            expense: 5000000,
            student: {
                _id: '1', 
                name: 'quan',
                studentId: '',
                educationType: '',
                gender: 'Nam',
                email: '',
                phoneNumber: '',
                birthDate: ''
            },
            periodValue: '',
          };
        
          test('renders topic information correctly', () => {
            const { getByText } = render(<RowTable index={1} topic={topic} currentPage={1} onOpenTopicExpenseForm={() => {}} />);
        
            expect(getByText('#1')).toBeInTheDocument();
            expect(getByText('topic 1')).toBeInTheDocument();
            expect(getByText('quan')).toBeInTheDocument();
            expect(getByText('5,000,000 VND')).toBeInTheDocument();
          });
        
          test('calls onOpenTopicExpenseForm when the "Sửa" button is clicked', () => {
            const handleOpenForm = jest.fn();
            render(<RowTable index={1} topic={topic} currentPage={1} onOpenTopicExpenseForm={handleOpenForm} />);
        
            fireEvent.click(screen.getByText('Sửa'));
        
            expect(handleOpenForm).toHaveBeenCalledTimes(1);
            expect(handleOpenForm).toHaveBeenCalledWith(topic);
          });
        });
    })
})
