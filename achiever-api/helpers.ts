export function validateId(id: string | undefined): number | null { // a TS promise that the return will be either a number or null
    if (!id) return null;
    const numId = Number(id);
    return Number.isInteger(numId) ? numId : null;
}