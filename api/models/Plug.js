module.exports = {
  attributes: {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      defaultValue: undefined
    },
    description: {
      type: Sequelize.TEXT
    },
    enabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isProduction: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },

  associations: function() {
    Plug.belongsTo(Customer, {
      foreignKey: {
        name: 'customerId',
        allowNull: false
      },
      as: 'customer'
    });

    Plug.hasMany(EnergyUsage, {
      foreignKey: 'plugId',
      as: 'usage'
    });

    Plug.hasMany(Timer, {
      foreignKey: 'plugId',
      as: 'timers'
    });
  },

  options: {
    timestamps: true,
    tableName: 'plugs',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
