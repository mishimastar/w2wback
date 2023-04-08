export const LoadTable = async (size: number) => {
    const resp = await fetch('/gettable', { headers: { size: String(size) } });
    const out = await resp.json();
    return out as { table: string; dict: string[]; size: number };
};
