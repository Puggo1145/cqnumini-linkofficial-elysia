import Elysia from "elysia";
// controllers
import { jwxtController } from "./jwxtController";


export const api = new Elysia({ prefix: "/api" })
    .use(jwxtController)
