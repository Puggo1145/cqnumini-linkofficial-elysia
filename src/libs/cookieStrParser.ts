export const parseCookieStr = (cookieStr: string): Record<string, string> => {
    const cookies: Record<string, string> = {};
    
    cookieStr.split(";").forEach((cookie) => {
        const [name, value] = cookie.split("=");
        if (name && value) {
            cookies[name.trim()] = value.trim();
        }
    });

    return cookies;
};