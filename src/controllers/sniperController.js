const Sniper = require('../models/sniperModel');

const sniper = new Sniper({
  money: 500,
  active: false,
  items: []
});

(async s => {
  const len = (await Sniper.find()).length;
  if (len > 0) return;

  await s.save();
})(sniper);

const getAllSniperInfo = async (req, res) => {
  const snipers = await Sniper.findOne();
  return await snipers;
};

exports.getAllSniperInfo = getAllSniperInfo;
