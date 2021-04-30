'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group.belongsTo(models.User, {foreignKey: 'created_by',targetKey:'id'})
    }
  };
  Group.init({
    group_name: DataTypes.STRING,
    created_by: {
      type: DataTypes.INTEGER,
      references: 'User', // <<< Note, its table's name, not object name
      referencesKey: 'id'
    },
    visibility: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};