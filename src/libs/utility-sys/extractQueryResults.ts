export const extractQueryResult2503 = (str: string): number | null => {
    const match = str.match(/剩余量(\d+(\.\d+)?)/);
    if (match && match[1]) {
        return parseFloat(match[1]);
    }

    return null;
};

export const extractQueryResult6701 = (str: string): { balance: number, waterSubsidy: number } | null => {
    const match = str.match(/剩余金额:(.+?)-剩余电补:(.+?)-剩余水补:(.+)/);

    if (match && match[1] && match[3]) {
        return {
            balance: parseFloat(match[1]),
            waterSubsidy: parseFloat(match[3])
        };
    }

    return null;
};
