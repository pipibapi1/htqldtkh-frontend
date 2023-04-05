import { EducationType } from '../../shared/types/educationType';

export const capitalizeFirstLetter = (str: EducationType | string) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
}

export const formatDate = (inputDate: Date) => {
    const date = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();

    return `${date}/${month}/${year}`;
}

export const displayPeriod = (periodString: string) => {
    if(periodString === "") return "";

    const date = new Date(periodString);
    return (date.getMonth() + 1) + "/" + date.getFullYear();
}

export const displayDate = (dateString: string) => {
    if(dateString === "") return ""

    const date = new Date(dateString);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

export const displayDate2 = (dateString: string) => {
    if(dateString === "") return "";

    const date = new Date(dateString);
    return "Ngày " + date.getDate() + " Tháng " + (date.getMonth() + 1) + " Năm " + date.getFullYear();
}