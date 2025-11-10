import { describe, it, expect } from 'vitest';
import { filterGames } from '../../docs/js/app.js';

describe('filterGames', () => {
    it('should return empty array for no matches', () => {
        expect(filterGames('Xqtyu', [{name: 'Year Walk'}, {name: 'SnowRunner'}])).toHaveLength(0);
    });
});