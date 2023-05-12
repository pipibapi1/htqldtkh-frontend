import { capitalizeFirstLetter, displayDate, displayDate2, displayPeriod, formatDate } from ".";

describe("Shared functions test", () => {
    test("test capitalizedFirstLetter function", () => {
        expect(capitalizeFirstLetter("sinh viên")).toBe("Sinh viên");
        expect(capitalizeFirstLetter("giáo vụ")).toBe("Giáo vụ");
        expect(capitalizeFirstLetter("cán bộ quản lý")).toBe("Cán bộ quản lý");
        expect(capitalizeFirstLetter("chính quy")).toBe("Chính quy");
        expect(capitalizeFirstLetter("chất lượng cao")).toBe("Chất lượng cao");
        expect(capitalizeFirstLetter("kỹ sư tài năng")).toBe("Kỹ sư tài năng");
    });

    test("test formatDate function", () => {
        expect(formatDate(new Date("2001-09-06T16:00:00.000Z"))).toBe("06/09/2001");
        expect(formatDate(new Date("2022-10-25T16:00:00.000Z"))).toBe("25/10/2022");
    });

    test("test displayPeriod function", () => {
        expect(displayPeriod("2023-06-01T16:00:00.000+00:00")).toBe("06/2023");
        expect(displayPeriod("2022-11-30T17:00:00.000+00:00")).toBe("12/2022");
    });

    test("test displayDate function", () => {
        expect(displayDate("2016-05-18T16:00:00.000+00:00")).toBe("18/05/2016");
        expect(displayDate("2023-01-18T16:16:15.066+00:00")).toBe("18/01/2023");
    });

    test("test displayDate2 function", () => {
        expect(displayDate2("2023-02-08T08:50:11.389+00:00")).toBe("Ngày 08 Tháng 02 Năm 2023");
        expect(displayDate2("2023-12-14T09:26:48.362+00:00")).toBe("Ngày 14 Tháng 12 Năm 2023");
    });
});
