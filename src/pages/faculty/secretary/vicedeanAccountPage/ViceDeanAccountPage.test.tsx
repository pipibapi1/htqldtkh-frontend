import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Modal from './Modal';
import { store } from '../../../../store';
import OtherMemberRow from "./OtherMemberRow";
import RequestInterface from './RequestInterface';

describe("vice dean account page management", () => {
  describe('Modal component', () => {
    const vicedean = {
      _id: '123',
      name: 'John Doe',
      staffId: 'ABC123',
      birthDate: new Date(),
      username: 'johndoe',
      password: 'password',
      rawPassword: 'password',
    };
    test('should display Modal when isVisible is true', () => {
      render(
        <Provider store={store}>
          <Modal isVisible={true} onClose={() => { }} vicedean={vicedean} />
        </Provider>
      );

      expect(screen.getByText('Thông tin chi tiết tài khoản')).toBeInTheDocument();
    });

    test('should not display Modal when isVisible is false', () => {
      render(
        <Provider store={store}>
          <Modal isVisible={false} onClose={() => { }} vicedean={vicedean} />
        </Provider>
      );

      expect(screen.queryByText('Thông tin chi tiết tài khoản')).not.toBeInTheDocument();
    });

    test('should show warning toast when username or password is empty', () => {
      render(
        <Provider store={store}>
          <Modal isVisible={true} onClose={() => { }} vicedean={vicedean} />
        </Provider>
      );

      const submitButton = screen.getByText('Cập nhật');

      fireEvent.click(submitButton);

      expect(screen.getByText('Bạn có chắc muốn cập nhật tài khoản cán bộ quản lý này?')).toBeInTheDocument();
    });
  });

  describe("OtherMemberRow", () => {
    const vicedean = {
      _id: "123",
      name: "John Doe",
      staffId: "456",
      username: "johndoe",
      accountCreationDate: new Date(),
    };
    const currentPage = 1;
    const index = 0;
    let component: any;

    beforeEach(() => {
      component = render(
        <Provider store={store}>
          <OtherMemberRow
            vicedean={vicedean}
            currentPage={currentPage}
            index={index}
          />
        </Provider>
      );
    });

    test("should render the correct vicedean details", () => {
      expect(component.getByText(vicedean.name)).toBeInTheDocument();
      expect(component.getByText(vicedean.staffId)).toBeInTheDocument();
      expect(component.getByText(vicedean.username)).toBeInTheDocument();
    });

    test("should show the confirmation modal when 'Xóa' is clicked", () => {
      const deleteButton = component.getByText("Xóa");
      fireEvent.click(deleteButton);
      expect(component.getByText("Bạn có chắc muốn xóa tài khoản cán bộ quản lý này?")).toBeInTheDocument();
      expect(component.getByText("Yes")).toBeInTheDocument();
    });
  });

  describe("reder vice dean acount page correct ly", () => {
    render(
      <Provider store={store}>
        <RequestInterface />
      </Provider>
    );
    expect(screen.getByText('Danh sách tài khoản cán bộ quản lý:')).toBeInTheDocument();
  })
})