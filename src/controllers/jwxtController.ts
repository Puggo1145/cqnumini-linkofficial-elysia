import Elysia, { t } from "elysia"
// service
import { JWXTService } from "../services";


const bodySchema = t.Object({
    cookie: t.String(),
});
const responseSchema = t.Object({
    success: t.Boolean(),
    code: t.String(),
    data: t.Optional(t.String()),
})

export const jwxtController = new Elysia({ prefix: "/jwxt" })
    .onError(({ error, set }) => {
        set.status = 400;

        return {
            success: false,
            code: "0",
            message: error.message,
        }
    })
    .post(
        "/signIn",
        async ({ body }) => {
            const cookie = await JWXTService.getJWXTCookie(body.cookie);

            return {
                success: true,
                code: "0",
                data: cookie
            }
        },
        {
            body: bodySchema,
            response: responseSchema
        }
    )