import { describe, expect, it } from "bun:test";
import { app } from "../src";

const cookieOnTest = [
    ""
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