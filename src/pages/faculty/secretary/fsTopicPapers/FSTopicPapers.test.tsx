import { render} from '@testing-library/react';
import { TopicPaperCard } from './TopicPapers';

describe('TopicPaperCard', () => {
  const templateWithPaper = {
    name: 'Test Paper',
    paper: {
      _id: '123',
      paperFileName: 'test.pdf'
    }
  };
  const topicId = '456';

  test('renders correctly', () => {
    const { getByText } = render(
      <TopicPaperCard templateWithPaper={templateWithPaper} topicId={topicId} />
    );

    expect(getByText('Test Paper')).toBeInTheDocument();
  });
});
