export const capitalizeFirstLetter = (str: string) => {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1);
    return str2;
}

export const formatDate = (inputDate: Date) => {
    const date = inputDate.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const month = (inputDate.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    const year = inputDate.getFullYear().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });

    return `${date}/${month}/${year}`;
}

export const displayPeriod = (periodString: string) => {
    if(periodString === "") return "";

    const date = new Date(periodString);
    return (date.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + "/" + date.getFullYear();
}

export const displayDate = (dateString: string) => {
    if(dateString === "") return ""

    const date = new Date(dateString);
    return date.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + "/" + (date.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + "/" + date.getFullYear();
}

export const displayDate2 = (dateString: string) => {
    if(dateString === "") return "";

    const date = new Date(dateString);
    return "Ngày " + date.getDate().toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + " Tháng " + (date.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    }) + " Năm " + date.getFullYear();
}