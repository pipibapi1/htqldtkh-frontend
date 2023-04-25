import { render, screen, fireEvent, act } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Swal from "sweetalert2";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { RootState } from "../../store";

import NotificationService from "../../services/notificationService";

import Header from ".";

const middlewares = [thunk];
const mockStore = configureMockStore<RootState>(middlewares);

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

describe("test Header Components", () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("header component when not logged in not logged in and the page is not an account service page", () => { 
        const initialState: RootState = {
            auth: {
                isLoggedIn: false,
                user: null,
            },
            message: {message: ""},
            topicCondition: {
                leaderCondition: "",
                expression: "",
                instructorCondition: "",
            }
        };
        const store = mockStore(initialState);  
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
    });

    test("header component when not logged in not logged in and the page is an account service page", () => {
        const initialState: RootState = {
            auth: {
                isLoggedIn: false,
                user: null,
            },
            message: {message: ""},
            topicCondition: {
                leaderCondition: "",
                expression: "",
                instructorCondition: "",
            }
        };
        const store = mockStore(initialState); 
        render(
        <Provider store={store}>
            <HashRouter>
                <Header isLogin={false} isAccountServicePage={true}/>
            </HashRouter>
        </Provider>
        );
        const linkToHomePage = screen.getByTestId("link-to-home-page");
        expect(linkToHomePage).toBeInTheDocument();
        expect(linkToHomePage).toHaveAttribute('href', `#/`);
    });

    test('should handle logout button click', async () => {
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
        jest.spyOn(Swal, 'fire').mockImplementation(() => Promise.resolve({ isConfirmed: true, isDenied: false, isDismissed: false }));
    
        render(
          <Provider store={store}>
            <HashRouter>
              <Header isLogin={true} isAccountServicePage={false} />
            </HashRouter>
          </Provider>
        );
    
        fireEvent.click(screen.getByTestId('logout-button'));
    
        expect(Swal.fire).toHaveBeenCalledWith({
          icon: 'question',
          title: 'Bạn có chắc muốn đăng xuất ?',
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: 'OK',
        });
    
        await Promise.resolve();
    
        expect(mockDispatch).toHaveBeenCalled();
        expect(window.location.pathname).toBe('/');
    });

    test("should fetch notifications from the server when the user logs in", async () => {
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
    
        jest.spyOn(NotificationService, 'getUnreadNotificationService').mockResolvedValue({
            notifications: [{ _id: "1", content: "Test notification" }],
        });
    
        await act(async () => {
            render(
              <Provider store={store}>
                <HashRouter>
                  <Header isLogin={true} isAccountServicePage={false} />
                </HashRouter>
              </Provider>
            );
        });
    
        expect(NotificationService.getUnreadNotificationService).toHaveBeenCalledTimes(
          1
        );
    });

    test("should display notifications when there are unread notifications", async () => {
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
    
        jest.spyOn(NotificationService, 'getUnreadNotificationService').mockResolvedValue({
            notifications: [{ _id: "1", content: "Test notification" }],
        });

        let container: any;
        await act(async () => {
            ({container} = render(
              <Provider store={store}>
                <HashRouter>
                  <Header isLogin={true} isAccountServicePage={false} />
                </HashRouter>
              </Provider>
            ));
        });
    
        fireEvent.click(screen.getByTestId("notification-bell"));
    
        expect(container.querySelector("#notification-content")).toBeInTheDocument();
        expect(container.querySelector("#notification-content")).toHaveTextContent(
          "Test notification"
        );
    });

    test('should render personal info link when user is logged in', () => {
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
        render(
          <Provider store={store}>
            <HashRouter>
              <Header isLogin={true} isAccountServicePage={false} />
            </HashRouter>
          </Provider>
        );
        const personalInfoLink = screen.getByRole('link', { name: /thông tin cá nhân/i });
        expect(personalInfoLink).toBeInTheDocument();
      });
    
      test('should not render personal info link when user is not logged in', () => {
        const initialState: RootState = {
            auth: {
                isLoggedIn: false,
                user: null,
            },
            message: {message: ""},
            topicCondition: {
                leaderCondition: "",
                expression: "",
                instructorCondition: "",
            }
        };
        const store = mockStore(initialState); 
        render(
          <Provider store={store}>
            <HashRouter>
              <Header isLogin={false} isAccountServicePage={false} />
            </HashRouter>
          </Provider>
        );
        const personalInfoLink = screen.queryByRole('link', { name: /thông tin cá nhân/i });
        expect(personalInfoLink).not.toBeInTheDocument();
      });
    
      test('should render home page link', () => {
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
        render(
          <Provider store={store}>
            <HashRouter>
              <Header isLogin={true} isAccountServicePage={false} />
            </HashRouter>
          </Provider>
        );
        const homePageLink = screen.getByTestId('link-to-home-page');
        expect(homePageLink).toBeInTheDocument();
      });
    
      test('should navigate to my page when link is clicked', () => {
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
        render(
          <Provider store={store}>
            <HashRouter>
              <Header isLogin={true} isAccountServicePage={false} />
            </HashRouter>
          </Provider>
        );
        const myPageLink = screen.getByTestId("link-to-my-page");
        expect(myPageLink).toBeInTheDocument();
      });
});