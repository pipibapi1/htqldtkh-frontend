import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { store } from "../../../../store";

describe("template management page", () => {
    describe("Modal component", () => {
      const onClose = jest.fn();
      const topic = "topic";
      const defaultProps = {
        isVisible: true,
        onClose,
        topic,
      };
    
      beforeEach(() => {
        jest.clearAllMocks();
      });
    
      test("should not render modal when isVisible is false", () => {
        const { container } = render(
            <Provider store={store}>
                <HashRouter>
                    <Modal {...defaultProps} isVisible={false}/>
                </HashRouter>
            </Provider>
        );
        const modal = container.querySelector(".modal");
        expect(modal).toBeNull();
      });
    
      test("should update the templateGivenId when input is changed", () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <Modal {...defaultProps} isVisible={true}/>
                </HashRouter>
            </Provider>
        );
        const input = screen.getByTestId('id-input');
        fireEvent.change(input, { target: { value: "new templateGivenId" } });
        expect(input).toHaveValue("new templateGivenId");
      });
    
      test("should update the templateName when input is changed", () => {
        render(
            <Provider store={store}>
                <HashRouter>
                    <Modal {...defaultProps} isVisible={true}/>
                </HashRouter>
            </Provider>
        );
        const input = screen.getByTestId('name-input');
        fireEvent.change(input, { target: { value: "new templateName" } });
        expect(input).toHaveValue("new templateName");
      });
    });
})
