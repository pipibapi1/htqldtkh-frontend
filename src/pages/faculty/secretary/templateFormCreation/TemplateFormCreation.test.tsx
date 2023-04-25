import { render, fireEvent, waitFor } from '@testing-library/react';
import TemplateFormCreation from './TemplateFormCreation';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { HashRouter } from 'react-router-dom';

import { useLocation } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

describe('TemplateFormCreation', () => {
  test('render correctly', async () => {
    (useLocation as jest.Mock).mockReturnValue({
        pathname: "/example",
        search: "?example=123",
        hash: "#example",
        state: { 
            templateGivenId: "ABC123",
            templateName: "template name"
        },
    });
    const mockFile = new File([''], 'example.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const { getByTestId, getByText } = render(
        <Provider store={store}>
            <HashRouter>
                <TemplateFormCreation />
            </HashRouter>
        </Provider>
    );
    const fileInput = getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    
    expect(getByText('Hiện tại tính năng chỉ hỗ trợ cho file định dạng .docx, .doc')).toBeInTheDocument();
  });
});
