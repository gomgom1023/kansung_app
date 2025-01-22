const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // MySQL 사용자 이름
  password: "root", // MySQL 비밀번호
  database: "mydatabase", // 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error("MySQL 연결 실패:", err);
    throw err;
  }
  console.log("MySQL 연결 성공");
});

module.exports = db;
