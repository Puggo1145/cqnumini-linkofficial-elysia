export const getRandomXFF = () => {
    const randomXFF = Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");
    return randomXFF;
};