const Sniper = require('../models/sniperModel');
const factory = require('./handlerFactory');
// const AppError = require('../utils/appError');

exports.getAllSniper = factory.getAll(Sniper);
exports.getSniper = factory.getOne(Sniper, { path: 'items' });
exports.createSniper = factory.createOne(Sniper);
exports.updateSniper = factory.updateOne(Sniper);
exports.deleteSniper = factory.deleteOne(Sniper);
