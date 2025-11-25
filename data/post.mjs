import { db } from "../db/database.mjs";

const SELECT_JOIN =
  "SELECT p.id, p.text, p.createAt, u.userid, u.name, u.url FROM users as u JOIN posts as p ON u.idx = p.useridx";
const ORDER_DESC = "ORDER BY p.createAt DESC";
const ORDER_ASC = "ORDER BY p.createAt ASC";

// 모든 포스트를 리턴
export async function getAll() {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => result[0]);
}

// 사용자 아이디(userid)에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
  return db
    .execute(`${SELECT_JOIN} WHERE u.userid=? ${ORDER_DESC}`, [userid])
    .then((result) => result[0]);
}

// SELECT p.id, p.text, p.createAt, u.userid, u.name, u.url FROM users as u JOIN posts as p ON u.idx = p.useridx ORDER BY p.createdAt DESC

// 글 번호(id)에 대한 포스트를 리턴
export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} WHERE p.id=?`, [id])
    .then((result) => result[0][0]);
}

//  포스트를 작성
export async function create(text, idx) {
  return db
    .execute("INSERT INTO posts (useridx, text) VALUES(?, ?)", [idx, text])
    .then((result) => getById(result[0].insertId));
}

// 포스트를 변경
export async function update(id, text) {
  return db
    .execute("UPDATE posts SET text=? WHERE id=?", [text, id])
    .then(() => getById(id));
}

// 포스트를 삭제
export async function remove(id) {
  return db.execute("DELETE FROM posts WHERE id=?", [id]);
}
