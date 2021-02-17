import { calculate } from '../../customer-screens/utils';

describe('calculate function', () => {

  it('returns 0 duration on same start and end dates', () => {
    const calculation = calculate(new Date(), new Date());
    expect(calculation?.duration).toBe(0);
  });

  it('returns duration correctly between start and end dates', () => {
    const calculation = calculate(new Date(), new Date(new Date().setDate(new Date().getDate() + 1)));
    expect(calculation?.duration).toBe(1);
  });

  it('calculates price correctly', () => {
    const calculation = calculate(
      new Date(),
      new Date(new Date().setDate(new Date().getDate() + 1)),
      10
    );
    const { subtotal, total } = calculation!;
    expect(subtotal).toBe(10);
    expect(total).toBe(11.5);
  });

  it('returns 0 if start date is before today', () => {
    const calculation = calculate(
      new Date('2020-09-4'),
      new Date('2020-09-6'),
      10
    );
    expect(calculation?.total).toBe(0);
  });

  it('returns 0 if end date is before today', () => {
    const calculation = calculate(
      new Date('2020-09-5'),
      new Date('2020-09-4'),
      10
    );
    expect(calculation?.total).toBe(0);
  });
});
