export const delayFn = async (delay = 400) => {
    return await new Promise((res) => setTimeout(res, delay));
};