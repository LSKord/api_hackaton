/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async knex => {
  await knex('users').del()
  await  knex('users').insert([
        {username: 'luis', password_hash: "$2b$12$zxhnnpykDoYZid.03taJG.sj1WL6.Tivcv1PuJEofljXMa0Yro4.i"},
  ]);
};