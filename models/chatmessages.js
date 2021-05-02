'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatMessages.belongsTo(models.User, {foreignKey: 'chat_room',targetKey:'id'}),
      ChatMessages.belongsTo(models.User, {foreignKey: 'sent_by',targetKey:'id'})
    }
  };
  ChatMessages.init({
    chat_room: {
      type: DataTypes.INTEGER,
      references: 'chatrooms', // <<< Note, its table's name, not object name
      referencesKey: 'id'
    },
    message: DataTypes.STRING,
    sent_by: {
      type: DataTypes.INTEGER,
      references: 'User', // <<< Note, its table's name, not object name
      referencesKey: 'id'
    },
  }, {
    sequelize,
    modelName: 'ChatMessages',
  });
  return ChatMessages;
};