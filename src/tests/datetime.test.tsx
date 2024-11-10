import '@testing-library/jest-dom';
import { formatDate, convertMilliToSeconds } from '@/utils/datetime';

describe('DateTime Utils', () => {
    test('formatDate', () => {
        const date = '2024-11-24';
        expect(formatDate(date)).toBe('November 24, 2024');
    });

    test('convertMilliToSeconds', () => {
        expect(convertMilliToSeconds('123456')).toBe(123.456);
        expect(convertMilliToSeconds(undefined)).toBe(0);
    });
});
