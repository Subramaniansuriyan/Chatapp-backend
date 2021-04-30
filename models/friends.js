'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friends extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Friends.belongsTo(models.User, {foreignKey: 'userid',targetKey:'id'}),
      Friends.belongsTo(models.User, {foreignKey: 'friendid',targetKey:'id'})
    }
  };
  Friends.init({
    userid: {
      type: DataTypes.INTEGER,
      references: 'User', // <<< Note, its table's name, not object name
      referencesKey: 'id'
    },
    friendid: {
      type: DataTypes.INTEGER,
      references: 'User', // <<< Note, its table's name, not object name
      referencesKey: 'id'
    },
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Friends',
  });
  return Friends;
};