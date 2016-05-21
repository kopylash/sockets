module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    value: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    }
  },

  associations: function() {
    EnergyUsage.belongsTo(Plug, {
      foreignKey: {
        name: 'plugId'
      },
      as: 'plug'
    });
  },

  options: {
    timestamps: true,
    tableName: 'usage',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
