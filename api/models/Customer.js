module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    energyCost: {
      type: Sequelize.DECIMAL(10,2),
      allowNull: false
    },
    wifiPassword: {
      type: Sequelize.STRING
    },
    limit: {
      type: Sequelize.INTEGER
    }
  },

  associations: function() {
    Customer.hasMany(Plug, {
      foreignKey: 'customerId',
      as: 'plugs'
    });
  },

  options: {
    timestamps: true,
    tableName: 'customers',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
