import { describe, it, expect } from 'vitest';
import { calculateProgress } from '../../docs/js/helpers.js';

describe('calculateProgress', () => {

    it('should return 50 when 5 out of 10 are completed', () => {
        expect(calculateProgress(5, 10)).toBe(50);
    });

    it('should return 0 when total is 0', () => {
        expect(calculateProgress(0, 0)).toBe(0);
    });

    it('should round fractional percentages', () => {
        expect(calculateProgress(1, 3)).toBe(33);
    })

    it('should cap at 100% when completed exceeds total', () => {
        expect(calculateProgress(15, 10)).toBe(100);
    })
});