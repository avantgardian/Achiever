export function validateId(id: string | undefined): number | null {
    if (!id) return null;
    const numId = Number(id);
    return Number.isInteger(numId) ? numId : null;
}