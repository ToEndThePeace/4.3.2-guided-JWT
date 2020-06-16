const db = require("../database/connection.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db("users").select("id", "username").orderBy("id");
}

// return role name instead of id
function findBy(filter) {
  return db("users AS U")
    .join("roles AS R", "R.id", "U.role")
    .select("U.id", "U.username", "U.password", "R.name AS role")
    .where(filter)
    .orderBy("U.id");
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findById(id) {
  return db("users").where({ id }).first();
}
