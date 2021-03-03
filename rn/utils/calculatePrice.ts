import { differenceInDays, isBefore, isEqual } from 'date-fns';

export type calculationResult = {
  subtotal: number;
  total: number;
  duration: number;
} | null;

export function calculatePrice(
  startDate: Date,
  endDate: Date,
  price: number = 0
): calculationResult {
  if (!startDate || !endDate) return null;
  let total: number, subtotal: number, duration: number;
  const isBeforeToday = isBefore(
    startDate,
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  //if start date is less then today, our rental dates are invalid
  //return everything is 0
  if (isBeforeToday || isEqual(startDate, endDate)) return { subtotal: 0, total: 0, duration: 0 };
  duration = differenceInDays(endDate, startDate);
  subtotal = duration * price;
  //if start date is ahead of endate, rental dates are wrong; 
  //Math.sign will returns 0 or negative integer on subtotal, in that case set subtotal to 0
  if (Math.sign(subtotal) <= 0) subtotal = 0;
  total = subtotal * 1.15 || 0;
  return { subtotal, total, duration };
}
