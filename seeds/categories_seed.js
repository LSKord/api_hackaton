/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async knex => {
  await knex('categories').del()
  await  knex('categories').insert([
        {  
          'name': 'Escolar'
        }
  ]);
};