import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import FSTopicConditionEditor from './topicConditionEditor';
import { store } from '../../../../store';

describe('FSTopicConditionEditor', () => {
  let component: any;

  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <FSTopicConditionEditor />
      </Provider>
    );
  });

  test('renders the select element with the default value of the first item in the TopicTypeEnum', async () => {
    const selectElement = await screen.findByTestId('topic-type-select') as HTMLSelectElement;
    expect(selectElement.value).toEqual('Chính quy');
  });

  test('when the "Edit" button is clicked, it should enable editing if topicCondition.isLoading is false', async () => {
    const editButton = await screen.findByTestId('edit-btn');
    fireEvent.click(editButton);
    expect(component.container.querySelector('select')).toBeEnabled();
  });
});
