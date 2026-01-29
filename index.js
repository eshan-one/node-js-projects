import fastify from "fastify";
import operatingHours from "./data/operatingHours.js";
import menuItems from "./data/menuItems.js";
import ejs from "ejs";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";
import { join } from "path";

const publicPath = join(process.cwd(), "public");
const app = fastify();
app.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
});

app.register(fastifyStatic, {
  root: publicPath,
  prefix: "/public/",
});
const port = 3000;

app.get("/", (request, reply) => {
  reply.view("views/index.ejs", { name: "What's fare is fair" });
});

app.get("/menu", (request, reply) => {
  reply.view("views/menu.ejs", { menuItems });
});

app.get("/hours", (req, reply) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const today = days[new Date().getDay() - 1] || days[0];
  reply.view("views/hours.ejs", { operatingHours, days, today });
});

app.get("/about", (req, reply) => {
  reply.view("views/about.ejs");
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});
