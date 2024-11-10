import moment from 'moment';

const formatDate = (dateString: string) => {
    return moment(dateString).format('MMMM D, YYYY'); // e.g., "November 24, 2024"
};

const convertMilliToSeconds = (milli: string | undefined) => {
    if (!milli) return 0;
    return parseFloat(milli) / 1000;
};

export { formatDate, convertMilliToSeconds };
