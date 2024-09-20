import Elysia from "elysia";
// controllers
import { jwxtController } from "./jwxtController";
import { utilityController } from "./utilityController";


export const api = new Elysia({ prefix: "/api" })
    .use(jwxtController)
    .use(utilityController)
