import moment from 'moment';

const formatDate = (dateString: string) => {
    return moment(dateString).format('MMMM D, YYYY'); // e.g., "November 24, 2024"
};

export { formatDate };
