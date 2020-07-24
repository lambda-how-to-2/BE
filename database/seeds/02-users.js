exports.seed = function (knex) {
    return knex("users").insert([
        {
            email: 'test',
            password: 'test'
        },
        {
            email: 'test2',
            password: 'test2'
        }
    ]);
};