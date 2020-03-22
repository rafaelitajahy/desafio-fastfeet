module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveryman', {
      delivery_id: {
        type: Sequelize.INTEGER,
        references: { model: 'delivery', key: 'id' },
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliveryman');
  },
};
