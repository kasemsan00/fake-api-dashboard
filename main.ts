import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import data from "./data.json" assert { type: "json" };
import statistics from './statistics.json' assert { type: "json" };
import agentList from './agentList.json' assert { type: "json" };
import lineLanguage from './lineLanguage.json' assert { type: "json" };
import centerBranch from './centerBranch.json' assert { type : "json"};
import abandonList from './abandonList.json' assert { type : "json"}

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
  .get("/12/agent", (context) => {
    context.response.body = agentList;
  })
  .get("/12/line-language", (context) => {
    context.response.body = lineLanguage
  })
  .get("/line/branch", (context) => {
    context.response.body = centerBranch
  })
  .get('/12/abandon/list', (context) => {
    context.response.body = abandonList
  })
  .get("/api/:dinosaur", (context) => {
    if (context?.params?.dinosaur) {
      const found = data.find((item) =>
        item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
      );
      if (found) {
        context.response.body = found;
      } else {
        context.response.body = "No dinosaurs found.";
      }
    }
  });


const app = new Application();
app.use(oakCors()); // Enable CORS for All Routes
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
