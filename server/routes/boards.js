const express = require("express");
const router = express.Router();
const db = require("../db"); // MySQL 연결

// 게시글 조회 API
router.get("/", (req, res) => {
  const query = "SELECT * FROM boards ORDER BY create_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("게시글 조회 실패:", err);
      return res.status(500).send("서버 오류");
    }

    // create_at 형식 변환
    const formattedResults = results.map((row) => ({
      ...row,
      create_at: new Date(row.create_at).toISOString().split('T')[0], // YYYY-MM-DD 형식으로 변환
    }));

    res.status(200).json(formattedResults);
  });
});

// 게시글 등록 API
router.post("/", (req, res) => {
  const { title, content } = req.body;
  const query = "INSERT INTO boards (title, content) VALUES (?, ?)";
  db.query(query, [title, content], (err, results) => {
    if (err) {
      console.error("게시글 등록 실패:", err);
      return res.status(500).send("서버 오류");
    }
    res.status(201).send("게시글 등록 성공");
  });
});

module.exports = router;
