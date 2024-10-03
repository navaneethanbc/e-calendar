export const incrementDate = (date, frequency) => {
  const incrementedDate = new Date(date);

  try {
    switch (frequency) {
      case "Daily":
        incrementedDate.setDate(incrementedDate.getDate() + 1);
        break;
      case "Weekly":
        incrementedDate.setDate(incrementedDate.getDate() + 7);
        break;
      case "Monthly":
        incrementedDate.setMonth(incrementedDate.getMonth() + 1);
        break;
      case "Yearly":
        incrementedDate.setFullYear(incrementedDate.getFullYear() + 1);
        break;
      default:
        break;
    }

    return incrementedDate;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const dateLimit = (date, frequency) => {
  const limit = new Date(date);

  try {
    switch (frequency) {
      case "Daily":
        limit.setMonth(limit.getMonth() + 2);
        break;
      case "Weekly":
        limit.setMonth(limit.getMonth() + 6);
        break;
      case "Monthly":
        limit.setMonth(limit.getMonth() + 12);
        break;
      case "Yearly":
        limit.setMonth(limit.getMonth() + 72);
        break;
      default:
        break;
    }

    return limit;
  } catch (error) {
    throw new Error(error.message);
  }
};
