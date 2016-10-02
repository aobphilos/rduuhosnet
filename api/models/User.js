/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var uuid = require("uuid");

module.exports = {

    attributes: {
        id: {
            type: 'integer',
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        username: { type: 'string' },
        password: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        organization: { type: 'string' },
        isActivated: {
            type: 'boolean',
            defaultsTo: false
        },
        activateKey: {
            type: 'text',
            defaultsTo: function () {
                return uuid.v4();
            }
        }
    }
};
