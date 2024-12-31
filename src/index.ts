import express from "express";
import { prisma } from "./db";
import { logger } from "./logger";
import morgan from "morgan";

export const app = express();
const morganformat = ":method :url :status :response-time ms";

app.use(express.json());
app.use(
  morgan(morganformat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
app.post("/register", async (req, res) => {
  const formBody = req.body;
  const newUser = await prisma.user.create({
    data: {
      ...formBody,
    },
  });
  res.status(201).json({
    message: "user registered successfully",
    data: newUser,
  });
});
app.get("/", (req, res) => {
  res.send("hello");
});
