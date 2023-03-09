import { EducationType } from '../../shared/types/educationType';

export const capitalizeFirstLetter = (str: EducationType | string) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
}

export const periodDisplay = (period: string) => {
    if (period === "") return "";

    const x = new Date(period);
    return x.getMonth() + 1 + "/" + x.getFullYear();
}

export const formatDate = (inputDate: Date) => {
    const date = inputDate.getDate();
    const month = inputDate.getMonth() + 1;
    const year = inputDate.getFullYear();

    return `${date}/${month}/${year}`;
}

