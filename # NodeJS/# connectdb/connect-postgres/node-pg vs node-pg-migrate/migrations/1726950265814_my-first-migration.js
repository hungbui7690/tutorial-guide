exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    username: { type: 'varchar(255)', notNull: true },
    username: { type: 'varchar(255)', notNull: true },
    password: { type: 'varchar(255)', notNull: true },
    image: { type: 'varchar(255)', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createTable('posts', {
    id: 'id',
    title: { type: 'varchar(255)', notNull: true },
    desc: { type: 'varchar(255)', notNull: true },
    image: { type: 'varchar(255)', notNull: true },
    userId: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    body: { type: 'text', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
  pgm.createIndex('posts', 'userId')
}
