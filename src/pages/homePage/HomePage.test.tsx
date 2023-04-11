import { render, fireEvent, screen } from '@testing-library/react';
import OldAnnouncement from './OldAnnouncement';
import { AnnouncementType } from '../../shared/interfaces/announcementInterface';
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "../../store"

const mockAnnouncements: AnnouncementType[] = [
  { _id: '1', title: 'Announcement 1', content: 'This is announcement 1' },
  { _id: '2', title: 'Announcement 2', content: 'This is announcement 2' },
  { _id: '3', title: 'Announcement 3', content: 'This is announcement 3' },
];

describe('test OldAnnouncement', () => {
  test('renders without crashing', () => {
    render(
        <Provider store={store}>
            <HashRouter>
                <OldAnnouncement oldAnnouncements={mockAnnouncements} currentPeriodValue="" year={new Date()} />
            </HashRouter>
        </Provider>
    );
    const year:number = (new Date()).getFullYear();
    expect(screen.getByText('CÁC THÔNG BÁO CỦA NĂM ' + year)).toBeInTheDocument();
  });

  test('displays the correct title when currentPeriodValue is provided', () => {
    render(
        <Provider store={store}>
            <HashRouter>
                <OldAnnouncement oldAnnouncements={mockAnnouncements} currentPeriodValue="2" year={new Date()} />
            </HashRouter>
        </Provider>
    );
    expect(screen.getByText('CÁC THÔNG BÁO CỦA ĐỢT 2')).toBeInTheDocument();
  });

  test('displays "KHÔNG CÓ THÔNG BÁO" when there are no announcements', () => {
    render(
        <Provider store={store}>
            <HashRouter>
                <OldAnnouncement oldAnnouncements={[]} currentPeriodValue="" year={new Date()} />)
            </HashRouter>
        </Provider>
    );
    expect(screen.getByText('KHÔNG CÓ THÔNG BÁO')).toBeInTheDocument();
  });

  test('displays all announcements when search text is empty', () => {
    render(
        <Provider store={store}>
            <HashRouter>
                <OldAnnouncement oldAnnouncements={mockAnnouncements} currentPeriodValue="" year={new Date()} />
            </HashRouter>
        </Provider>
    );
    expect(screen.getAllByTestId('announcement-banner')).toHaveLength(3);
  });

  test('displays only matching announcements when search text is provided', () => {
    render(
        <Provider store={store}>
            <HashRouter>
                <OldAnnouncement oldAnnouncements={mockAnnouncements} currentPeriodValue="" year={new Date()} />
            </HashRouter>
        </Provider>
    );
    const searchInput = screen.getByPlaceholderText('Tìm kiếm bằng văn bản');
    fireEvent.change(searchInput, { target: { value: '2' } });
    fireEvent.click(screen.getByText('Tìm kiếm'));
    expect(screen.getAllByTestId('announcement-banner')).toHaveLength(1);
  });
});
