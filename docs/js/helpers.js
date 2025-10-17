/**
    * Calculate the percentage of completed achievements
    * @param {number} completed - Number of completed achievements
    * @param {number} total - Total number of achievements  
    * @returns {number} Percentage (0-100)
*/
export function calculateProgress(completed, total) {
    if (total === 0) return 0;
    if (completed > total) return 100;
    return Math.round((completed / total) * 100);
}