import { render, fireEvent } from "@testing-library/react";
import UserProfile from "./UserProfile";
import { HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from "../../store";

describe("test personal information page", () => {
      afterAll(() => {
        localStorage.removeItem("user");
      });

  test("should render user's information", () => {
    const user = {
      name: "John",
      role: "sinh viên",
      studentId: "12345",
      gender: "Nam",
      birthDate: new Date("1995-01-01"),
      image: "image.jpg",
      educationType: "chính quy",
      accountStatus: "đã duyệt"
    };
    localStorage.setItem("user", JSON.stringify(user))
    const { getByText, getByAltText } = render(
                                        <Provider store={store}>
                                            <HashRouter>
                
                                                <UserProfile />
                                            </HashRouter>
                                        </Provider>
                                        );

    expect(getByText("Sinh viên")).toBeInTheDocument();
    expect(getByText("John")).toBeInTheDocument();
    expect(getByText("12345")).toBeInTheDocument();
    expect(getByText("Nam")).toBeInTheDocument();
    expect(getByText("01/01/1995")).toBeInTheDocument();
    expect(getByAltText("Ava")).toHaveAttribute("src", "image.jpg");
  });

  test("should render edit mode when edit button is clicked", () => {
    const user = {
        name: "John",
        role: "sinh viên",
        studentId: "12345",
        gender: "Nam",
        birthDate: new Date("1995-01-01"),
        image: "image.jpg",
        educationType: "chính quy",
        accountStatus: "chờ duyệt"
    };
    localStorage.setItem("user", JSON.stringify(user))
    const { getByText, getByTestId } = render(
                                            <Provider store={store}>
                                                <HashRouter>

                                                    <UserProfile />
                                                </HashRouter>
                                            </Provider>
                                            );

    const editButton = getByTestId("edit-button");
    fireEvent.click(editButton);

    expect(getByText("Lưu")).toBeInTheDocument();
    expect(getByTestId("input-name")).toBeInTheDocument();
    expect(getByTestId("input-studentId")).toBeInTheDocument();
    expect(getByTestId("select-gender")).toBeInTheDocument();
    expect(getByTestId("datepicker-birthDate")).toBeInTheDocument();
  });
});
