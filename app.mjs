import express from "express";
import postsRouter from "./router/posts.mjs";
import authRouter from "./router/auth.mjs";
import { config } from "./config.mjs";
// import { db } from "./db/database.mjs";

const app = express();

app.use(express.json());

app.use("/post", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// db.getConnection().then((connection) => console.log(connection));
// 프론트에서 오는 요청을 듣는다.
app.listen(config.host.port, () => {
  "서버 실행 중"
});
