import OldAnnouncement from "./OldAnnouncement";
import { appRouters } from "../../shared/urlResources";
import { Link } from "react-router-dom";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getAnnouncementsAction } from "../../actions/announcementAction";
import DatePicker from "react-datepicker";
import Calendar from "../../assets/images/calendar.png";
import React, { useEffect, useState } from "react";
import { Period } from "../../shared/interfaces/periodInterface";
import { getAllPeriodsAction } from "../../actions/periodAction";

const MAX_INT = "999999";

interface AnnouncementType {
  _id: string;
  title: string;
  fileType: string;
  fileName: string;
  createAt: Date;
  content: string;
}

const Announcement: React.FC = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const [periods, setPeriods] = useState<Period[]>([]);
  const [currentPeriod, setCurrentPeriod] = useState<string>("");
  const [year, setYear] = useState(new Date());

  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();

  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [latestAnnouncement, setLatestAnnouncement] = useState("");
  const [latestAnnouncementId, setLatestAnnouncementId] = useState("");
  const periodDisplatFromId = (periodId: string) => {
    const period = periods.find((period) => period._id === periodId);
    if (period) {
      return periodDisplay(period.period);
    }
  };

  const periodDisplay = (period: string) => {
    if (period === "") return "";
    const x = new Date(period);
    return x.getMonth() + 1 + "/" + x.getFullYear();
  };

  useEffect(() => {
    let queryPeriod: any = {
      year: new Date().getFullYear(),
    };
    dispatch(getAllPeriodsAction(queryPeriod))
      .then((data) => {
        setPeriods(data?.periods);
        if (data?.periods.length > 0) {
          setCurrentPeriod(data?.periods[0]._id);
          onChangePeriod(data?.periods[0]._id);
         
        }
      })
      .catch((error) => {});
    
  }, []);

  const onChangePeriod = (period: string) => {
    let query: any = {
      page: "1",
      limit: MAX_INT,
    }
    if(period === ""){
      query = {
        ...query,
        year: year.getFullYear()
      };
    }
    else{
      query = {
        ...query,
        period: period
      };
    }

    dispatch(getAnnouncementsAction(query))
      .then((data) => {
        setAnnouncements(data?.announcements);
        if (data?.announcements.length > 0) {
          setLatestAnnouncementId(data?.announcements[0]._id);
          setLatestAnnouncement(
            process.env.REACT_APP_API_URL +
              "/api/announcement" +
              `/${data?.announcements[0]._id}/file`
          );
        }
        else{
          setLatestAnnouncementId("");
          setLatestAnnouncement("");
        }
      })
      .catch((error) => {});
  };

  const onChangeYear = (d: Date) => {
    let query: any = {
      year: d.getFullYear(),
    };
    dispatch(getAllPeriodsAction(query))
      .then((data) => {
        setPeriods(data?.periods);
        if (data?.periods.length > 0) {
          setCurrentPeriod(data?.periods[0]?._id);
          onChangePeriod(data?.periods[0]?._id);
        }
        else{
          const queryForYear = {
            page: "1",
            limit: MAX_INT,
            year: d.getFullYear()
          };
          dispatch(getAnnouncementsAction(queryForYear))
          .then((data) => {
            setAnnouncements(data?.announcements);
            if (data?.announcements.length > 0) {
              setLatestAnnouncementId(data?.announcements[0]._id);
              setLatestAnnouncement(
                process.env.REACT_APP_API_URL +
                  "/api/announcement" +
                  `/${data?.announcements[0]._id}/file`
              );
            }
            else{
              setLatestAnnouncementId("");
              setLatestAnnouncement("");
            }
          })
          .catch((error) => {});
        }
      })
      .catch((error) => {});
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offSet: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offSet);
  };

  const changePageBack = () => {
    changePage(-1);
  };

  const changePageNext = () => {
    changePage(+1);
  };

  return (
    <div>
      <div className="border-b px-10 pt-5 pb-2 flex items-center">
        <div className="mr-5">Năm:</div>
        <div className="grid justify-items-end items-center mr-10">
          <DatePicker
            onChange={(date) => {
              if (date) {
                setYear(date);
                onChangeYear(date);
              }
            }}
            selected={year}
            dateFormat="yyyy"
            showYearPicker
            className="h-[40px] w-[90px] border border-black border-1 rounded-md px-2"
          />
          <div className="absolute mr-2">
            <img src={Calendar} alt="calendarIcon" className="h-5 w-5" />
          </div>
        </div>
        <div className="mr-5">Đợt:</div>
        
          <div className="">
            <select
              className="bg-white h-[40px] w-[270px] border border-black border-1 rounded-lg focus:ring-blue-500 px-2"
              onChange={(e) => {
                e.preventDefault();
                setCurrentPeriod(e.target.value);
                onChangePeriod(e.target.value);
              }}
              defaultValue={periods.length === 0 ? "" : periods[0]._id}
              value={currentPeriod}
            >
              {periods.map((period, index) => (
                <option value={period._id} id={period._id}>
                  {periodDisplay(period.period)}
                </option>
              ))}
              <option value="">- -</option>
            </select>
          </div>
        
      </div>
      <div className="grid grid-cols-3">

        <main className="px-12 py-6 border-r col-span-2">
          {periods.length > 0 && latestAnnouncementId !== "" ? <Link
            to={
              `/${appRouters.LINK_TO_OLD_ANNOUNCEMENT_PAGE}` +
              `/${latestAnnouncementId}`
            }
          >
            <div className="py-4 text-blue-600 font-semibold">
              THÔNG BÁO MỚI NHẤT CỦA {currentPeriod !== "" ? "ĐỢT " + periodDisplatFromId(currentPeriod) : "NĂM " + year.getFullYear()}
            </div>
          </Link> : 
          <div className="py-4 text-blue-600 font-semibold">
          KHÔNG CÓ THÔNG BÁO
        </div>
          }

          {periods.length > 0 && latestAnnouncement !== "" ?<Document
            file={latestAnnouncement}
            onLoadSuccess={onDocumentLoadSuccess}
            className="border border-3 rounded-lg py-5 px-1 m-1 flex flex-col justify-center items-center"
          >
            <Page
              width={900}
              pageNumber={pageNumber}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            <p className="text-center">
              {" "}
              Page {pageNumber} of {numPages}
            </p>

            {pageNumber > 1 && (
              <button
                onClick={changePageBack}
                className="bg-[#0079CC] text-xs  transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
              >
                Previous Page
              </button>
            )}
            {pageNumber < numPages! && (
              <button
                onClick={changePageNext}
                className="bg-[#0079CC] text-xs transition text-white font-semibold py-4 px-5 border border-white-500 rounded-[15px] hover:bg-[#025A97] hover:cursor-pointer"
              >
                Next Page
              </button>
            )}
          </Document> : 
          <div>
            No PDF
          </div>
          }
        </main>

        {periods.length > 0 ? <OldAnnouncement
          oldAnnouncements={announcements}
          currentPeriodValue={currentPeriod !== "" ? periodDisplatFromId(currentPeriod) : ""}
          year={year}
        />: <OldAnnouncement
        oldAnnouncements={[]}
        currentPeriodValue={""}
        year={year}
      />}
      </div>
    </div>
  );
};

export default Announcement;
