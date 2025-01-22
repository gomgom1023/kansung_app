const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const boardRoutes = require("./routes/boards"); // 라우트 추가

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API 라우트 연결
app.use("/api/boards", boardRoutes); // /api/boards 경로에서 boardRoutes 사용

// 서버 시작
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Express 서버 실행 중: http://localhost:${PORT}`);
});
