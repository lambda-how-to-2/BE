// Update with your config settings.

module.exports = {
	testing: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./database/howtodos-test.db3",
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			},
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
	development: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./database/howtodos.db3",
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			},
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},

	staging: {
		client: "postgresql",
		connection: {
			database: "my_db",
			user: "username",
			password: "password",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
		},
	},

	production: {
		client: "sqlite3",
		useNullAsDefault: true,
		connection: {
			filename: "./database/howtodos.db3",
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			},
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: "./database/seeds",
		},
	},
};
