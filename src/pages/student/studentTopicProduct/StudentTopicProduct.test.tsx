import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useParams, HashRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { RootState } from "../../../store";

import { getAProductByTopicIdAction } from '../../../actions/productAction';

import TopicProduct from './TopicProduct';

const middlewares = [thunk];
const mockStore = configureStore<RootState>(middlewares);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn()
}));  

describe('student topic product', () => {
    
  test('should dispatch getAProductByTopicIdAction with correct parameters', async () => {
    const initialState: RootState = {
        auth: {
            isLoggedIn: true,
            user: {
                _id: '123',
                role: 'sinh viên',
            },
        },
        message: {message: ""},
        topicCondition: {
            leaderCondition: "",
            expression: "",
            instructorCondition: "",
        }
    };
    const store = mockStore(initialState); 
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    (useParams as jest.Mock).mockReturnValue({ _id: '123' });
    render(
      <Provider store={store}>
        <HashRouter>
            <TopicProduct/>
        </HashRouter>
      </Provider>,
    );

    await(() => expect(dispatchSpy).toHaveBeenCalledWith(
        getAProductByTopicIdAction("123"),
    ));
  });
});
