import { Elysia } from "elysia";
import { api } from "./controllers";


const app = new Elysia()
  .use(api)
  .onError(({ error }) => {
    return {
      success: false,
      code: "",
      message: error.message,
    }
  })
  .get("/test-error", () => { throw new Error("Hello, Elysia!") })
  .get("/standard-res", () => "Hello, Elysia!")
  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
