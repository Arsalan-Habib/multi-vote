import { useEffect, useState, useMemo } from "react";

export default (futureTime: number) => {
  const [timeFinished, setTimeFinished] = useState<boolean>(
    futureTime < Date.now()
  );
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>(getTimeLeft(futureTime - Date.now()));

  useEffect(() => {
    const now = Date.now();
    if (futureTime && now < futureTime) {
      setTimeLeft(
        getTimeLeft(futureTime - now) ?? {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      );
      setTimeFinished(false);
    } else {
      setTimeFinished(true);
      setTimeLeft(
        getTimeLeft(futureTime - now) ?? {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      );
    }
    const interval = setInterval(() => {
      const now = Date.now();
      if (futureTime && now < futureTime) {
        setTimeLeft(
          getTimeLeft(futureTime - now) ?? {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          }
        );
        setTimeFinished(false);
      } else {
        setTimeFinished(true);
        setTimeLeft(
          getTimeLeft(futureTime - now) ?? {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          }
        );
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [futureTime]);

  return useMemo(() => ({ timeFinished, timeLeft }), [timeFinished, timeLeft]);
};

export const getTimeLeft = (delta: number) => {
  if (delta <= 0)
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

  let deltaSec = delta / 1000;

  // calculate (and subtract) whole days
  let days = Math.floor(deltaSec / 86400);
  deltaSec -= days * 86400;

  // calculate (and subtract) whole hours
  const hours = Math.floor(deltaSec / 3600) % 24;
  deltaSec -= hours * 3600;

  // calculate (and subtract) whole minutes
  const minutes = Math.floor(deltaSec / 60) % 60;
  deltaSec -= minutes * 60;

  // what's left is seconds
  const seconds = deltaSec % 60;

  return { days, hours, minutes, seconds: Math.floor(seconds) };
};
