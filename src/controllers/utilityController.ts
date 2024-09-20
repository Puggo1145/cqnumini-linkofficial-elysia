import Elysia, { t } from "elysia";
// service
import { UtilityService } from "../services";


const getCardInfoSchema = t.Object({
    studentId: t.String(),
});
const getUtilityBalanceSchema = t.Object({
    eCardId: t.String(),
    dormitoryName: t.String(),
    roomNumber: t.String(),
});


export const utilityController = new Elysia({ prefix: "/utility" })
    .onError(({ error, set }) => {
        set.status = 400;

        return {
            success: false,
            code: "",
            message: error.message,
        }
    })
    .post(
        '/getCardInfo',
        async ({ body }) => {
            const card = await UtilityService.getCardInfo(body.studentId);

            return {
                success: true,
                code: "",
                data: card
            }
        },
        {
            body: getCardInfoSchema,
        }
    )
    .post(
        '/getUtilityBalance',
        async ({ body }) => {
            const result = await UtilityService.getUtilityBalance(body);

            return {
                success: true,
                code: "0",
                data: result
            };
        },
        {
            body: getUtilityBalanceSchema,
        }
    );