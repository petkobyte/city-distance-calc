import { formatDateString } from '../dateFormatter';

describe('formatDateString', () => {
  it('should format the date string correctly', () => {
    const dateString = 'Tue, 20 Jun 2023 09:03:32 GMT';
    const formattedDate = formatDateString(dateString);
    expect(formattedDate).toBe('Jun 20, 2023');
  });

  it('should handle invalid date string', () => {
    const dateString = 'Invalid Date';
    const formattedDate = formatDateString(dateString);
    expect(formattedDate).toBe('Invalid Date');
  });
});
