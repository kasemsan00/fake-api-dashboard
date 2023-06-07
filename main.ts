import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import data from "./fakeData/data.json" assert { type: "json" };
import statistics from "./fakeData/statistics.json" assert { type: "json" };
import agentList from "./fakeData/agentList.json" assert { type: "json" };
import lineLanguage from "./fakeData/lineLanguage.json" assert { type: "json" };
import centerBranch from "./fakeData/centerBranch.json" assert { type: "json" };
import abandonList from "./fakeData/abandonList.json" assert { type: "json" };
import incomingSummaryCenter from "./fakeData/incomingSummaryCenter.json" assert { type: "json" };
import incomingSummaryBranch from "./fakeData/incomingSummaryBranch.json" assert { type: "json" };

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Fake API for Dashboard";
  })
  .get("/api", (context) => {
    context.response.body = data;
  })
  .get("/12/status/24hr", (context) => {
    context.response.body = statistics;
  })
  .get("/agent/center", (context) => {
    context.response.body = agentList;
  })
  .get("/agent/branch", (context) => {
    context.response.body = agentList;
  })
  .get("/12/line-language", (context) => {
    context.response.body = lineLanguage;
  })
  .get("/line/branch", (context) => {
    context.response.body = centerBranch;
  })
  .get("/abandon/center", (context) => {
    context.response.body = abandonList;
  })
  .get("/12/abandon/branch", (context) => {
    context.response.body = abandonList;
  })
  .get("/incoming/summary/center", (context) => {
    context.response.body = incomingSummaryCenter;
  })
  .get("/12/incoming/summary/branch", (context) => {
    context.response.body = incomingSummaryBranch;
  });

const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
