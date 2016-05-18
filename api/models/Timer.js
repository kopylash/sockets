module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    triggerTime: {
      type: Sequelize.DATE,
      allowNull: false
    },
    isDeviceEnabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    isCountdown: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },

  associations: function() {
    Timer.belongsTo(Plug, {
      foreignKey: {
        name: 'plugId'
      },
      as: 'plug'
    });
  },

  options: {
    timestamps: true,
    tableName: 'timers',
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
