import { urls } from "../constants/urls";
import { getUA } from "../libs/getRandomUA";
import { parseCookieStr } from "../libs/cookieStrParser";


export abstract class JWXTService {
    static async getJWXTCookie(mainCookie: string): Promise<string | undefined> {
        let url = urls.jwxt.signIn;

        // 初始化 cookies 对象，并将 mainCookie 解析后添加进去
        let cookies = parseCookieStr(mainCookie);


        let maxRedirects = 10;
        let redirectCount = 0;


        const randomUA = getUA();

        while (redirectCount < maxRedirects) {
            // 创建一个 AbortController 实例用于超时控制
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort();
            }, 3000); // 3 秒超时

            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                        "Accept-Encoding": "gzip, deflate, br",
                        "Accept-Language": "en,zh-CN;q=0.9,zh;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                        "Connection": "keep-alive",
                        "Cookie": Object.entries(cookies)
                            .map(([name, value]) => `${name}=${value}`)
                            .join("; "),
                        "Referer": "https://csxmh.cqnu.edu.cn/",
                        "User-Agent": randomUA,
                    },
                    redirect: "manual", // 手动处理重定向
                    signal: controller.signal,
                });


                // 提取 Set-Cookie 并存储
                const setCookieHeaders = response.headers.get("set-cookie");
                if (setCookieHeaders) {
                    // 解析 Set-Cookie 字符串
                    const setCookies = setCookieHeaders.split(/,(?=\s*\w+=)/);
                    setCookies.forEach((cookieStr) => {
                        const [cookiePair] = cookieStr.split(";");
                        const [name, value] = cookiePair.split("=");
                        if (name && value) {
                            cookies[name.trim()] = value.trim();
                        }
                    });
                }

                if (response.status >= 300 && response.status < 400) {
                    // 处理重定向
                    const location = response.headers.get("location");
                    if (!location) {
                        throw new Error("重定向缺少 Location");
                    }

                    // 更新 URL，处理相对路径和绝对路径
                    if (location.startsWith("http")) {
                        url = location;
                    } else {
                        const baseUrl = new URL(url);
                        url = new URL(location, baseUrl).toString();
                    }

                    redirectCount++;
                } else {
                    // 根据重定向次数判断是否获取成功
                    if (redirectCount === 0) {
                        throw new Error("登录过期");
                    }


                    // 5次重定向代表教务系统 cookie 换取成功，处理最终响应
                    const finalCookies = Object.keys(cookies)
                        .filter((name) => name === "JSESSIONID" || name === "route")
                        .map((name) => `${name}=${cookies[name]}`)
                        .join("; ");

                    // 返回最终的 Cookie 字符串
                    return finalCookies;
                }
            } catch (err) {
                clearTimeout(timeoutId);

                if ((err as Error).name === "AbortError") {
                    // 处理超时错误
                    throw new Error("请求人数过多，触发了教务系统限流，请稍后再试");
                }
            }
        }

        if (redirectCount >= maxRedirects) {
            throw new Error("重定向次数过多");
        }

        return undefined;
    }
}
