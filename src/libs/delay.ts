// 延迟函数，生成随机延迟时间，减少限流的可能性
export const delay = () => {
    const ms = Math.floor(Math.random() * 1000) + 3000;
    console.log(`延迟 ${ms} 毫秒`);

    return new Promise(resolve => setTimeout(resolve, ms));
}