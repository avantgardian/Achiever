import { describe, it, expect } from 'vitest';
import { calculateProgress } from '../../docs/js/helpers.js';

describe('calculateProgress', () => {

    it('should return 50 when 5 out of 10 are completed', () => {
        expect(calculateProgress(5, 10)).toBe(50);
    });

    it('should return 0 when total is 0', () => {
        expect(calculateProgress(0, 0)).toBe(0);
    });
});