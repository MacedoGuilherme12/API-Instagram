
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey : true,
        autoIncrement : true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      avatar: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }

    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('Users')
  }
};
