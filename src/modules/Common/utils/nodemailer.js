const nodemailer = require("nodemailer");
const { SMTP } = require('../../../config')

const sendMail = (mailConfig) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      ...SMTP
    });

    transporter
      .sendMail({
        from: '"Deal project" <nanotexnolagiya@mail.ru>',
        ...mailConfig
      })
      .then((info) => {
        resolve(info);
      })
      .catch(reject);
  });
};

module.exports = {
  sendMail,
};
