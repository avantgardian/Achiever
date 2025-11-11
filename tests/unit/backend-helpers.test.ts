import { describe, it, expect } from 'vitest';
import { validateId } from '../../achiever-api/helpers.js';

describe('validateId', () => {
    it('convert valid integer string to number', () => {
        expect(validateId('123')).toBe(123);
    });

    it('invalid string', () => {
        expect(validateId('abc')).toBe(null);
    });

    it('invalid float string', () => {
        expect(validateId('12.5')).toBe(null);
    });

    it('undefined value', () => {
        expect(validateId(undefined)).toBe(null);
    });

    it('empty string', () => {
        expect(validateId('')).toBe(null);
    });

    it('handles zero correctly', () => {
        expect(validateId('0')).toBe(0);
    });

    it('handles negative numbers correctly', () => {
        expect(validateId('-5')).toBe(-5);
    });
});