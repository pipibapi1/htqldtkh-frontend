import { render, screen } from "@testing-library/react";
import Header from "."
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe("test Header Components", () => {
    test("header component when not logged in not logged in and the page is not an account service page", () => {   
        render(
        <Provider store={store}>
            <HashRouter>
                <Header isLogin={false} isAccountServicePage={false}/>
            </HashRouter>
        </Provider>
        );
        const linkToHomePage = screen.getByTestId("link-to-home-page");
        expect(linkToHomePage).toBeInTheDocument();
        expect(linkToHomePage).toHaveAttribute('href', `#/`);
        const linkToRegisterPage = screen.getByTestId("link-to-register-page");
        expect(linkToRegisterPage).toBeInTheDocument();
        expect(linkToRegisterPage).toHaveAttribute('href', '#/register');
        const linkToLoginPage = screen.getByTestId("link-to-login-page");
        expect(linkToLoginPage).toBeInTheDocument();
        expect(linkToLoginPage).toHaveAttribute('href', '#/login');
    })
})