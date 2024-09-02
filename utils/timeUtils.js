export const timeToMinutes = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

export const calculateHeight = (startTime, endTime) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  return `${(endMinutes - startMinutes) * 2}px`;
};

export const calculateTopPosition = (startTime) => {
  const startMinutes = timeToMinutes(startTime);
  return `${startMinutes * 2}px`;
};
