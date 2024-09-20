import { describe, expect, it } from "bun:test";
import { app } from "../src";

const cookieOnTest = [
    "CASTGC=TGT-130466-eyPDpcMSz9lZYc69BubSdAX0cbgM1CskmGwvHhKfcxLkgDH4ea-https://csxrz.cqnu.edu.cn/cas; Path=/cas/",
    "CASTGC=TGT-130870-Df2syGc2hk4gFzHpfM7xwatYbA7qvBXxoqZCebetlqdyxnHWyn-https://csxrz.cqnu.edu.cn/cas; Path=/cas/",
    "CASTGC=TGT-130696-ENLXwdndf0QIxkZO22aQnbDOkumz6t23cJUaEBi9RIWqb5PcrA-https://csxrz.cqnu.edu.cn/cas; Path=/cas/",
    "CASTGC=TGT-130525-wERPtKuzrBXnGbliDoxZaWTNycqQ1aLFGvquz3HgY6P66Ek6iV-https://csxrz.cqnu.edu.cn/cas; Path=/cas/",
    "CASTGC=TGT-130786-dWVoToNHwYRM4dw66wofCC5QjqeGgNWPuhEpcHqH4C41NceuH1-https://csxrz.cqnu.edu.cn/cas; Path=/cas/",
]; 


describe('getJwxtCookie api', () => {
    cookieOnTest.forEach(cookie => {
        it(`should get jwxt cookie`, async () => {
            const response = await app.handle(new Request('http://localhost:3000/api/jwxt/signIn', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cookie: cookie
                })
            }));

            expect(response.status).toBe(200);

            const json = await response.json();
            
            expect(json.success).toBe(true);
            expect(json.code).toBe("0");
            expect(json.data).toBeString();
        });
    });
});