
const formatDate = (inputDate) => {
    const parts = inputDate?.split('/'); // Split the input date string by "/"
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    // Array of month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    // Get the abbreviated month name using the month number
    const abbreviatedMonth = monthNames[parseInt(month, 10) - 1];
    // Construct the formatted date string
    const formattedDate = `${day}-${abbreviatedMonth}-${year}`;
    return formattedDate;
};

export default formatDate;