'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group_Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Group_Members.belongsTo(models.Group, {foreignKey: 'g_id',targetKey:'id'}),
      Group_Members.belongsTo(models.User, {foreignKey: 'member_id',targetKey:'id'})
    }
  };
  Group_Members.init({
    g_id: DataTypes.INTEGER,
    member_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group_Members',
  });
  return Group_Members;
};