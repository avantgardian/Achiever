import { describe, it, expect } from 'vitest';
import { filterGames } from '../../docs/js/app.js';

describe('filterGames', () => {
    const mockGames = [{name: 'Year Walk'}, {name: 'SnowRunner'}];

    it('should return empty array for no matches', () => {
        expect(filterGames('Xqtyu', mockGames)).toHaveLength(0);
    });

    it('should return all games when query is empty', () => {
        expect(filterGames('', mockGames)).toHaveLength(2);
    });

    it('is case-insensitive', () => {
        const result = filterGames('YEAR WALK', mockGames);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Year Walk');
    });

    it('partial matching works', () => {
        const result = filterGames('walk', mockGames);
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Year Walk');
    });

    it('handles null by returning all games', () => {
        expect(filterGames(null, mockGames)).toHaveLength(2);
    });

    it('handles undefined by returning all games', () => {
        expect(filterGames(undefined, mockGames)).toHaveLength(2);
    });
});