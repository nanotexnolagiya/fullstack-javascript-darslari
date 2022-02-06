const { BaseController } = require("../../Common/controllers");
const { sendMail } = require("../../Common/utils");
const { AuthDao, SMSCodesDao } = require("../dao");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET_KEY } = require("../../../config");

function AuthController() {
  const authDao = new AuthDao();
  const smsCodesDao = new SMSCodesDao();

  this.dao = authDao;
  this.smsDao = smsCodesDao;

  this.mailMessageTemplate = `<p>Hello!</p>

  <p>Your email address was specified to log in to the site Deal</p>
  
  <p>Please enter this code on the authorization page:</p>
  
  <h1>__CODE__</h1>
  
  
  <p>If it's not you or you haven't registered on the site, then just ignore this email.</p>`;

  this.mailSubjectTemplate = "__CODE__ - confirmation code for Deal";
}

AuthController.prototype.login = function (req, res, next) {
  const { body } = req;

  const data = { email: body.email };

  this.dao.findOrCreate(data, data).then((item) => {
    const code = Math.round(Math.random() * 1000000);
    const expired = new Date();
    expired.setHours(expired.getHours() + 2);

    sendMail({
      subject: this.mailSubjectTemplate.replace("__CODE__", code),
      to: item.email,
      html: this.mailMessageTemplate.replace("__CODE__", code),
    })
      .then((info) => {
        if (!info.accepted.length) {
          next(new Error("The message rejected"))
          return;
        };

        this.smsDao
          .delete({
            userId: item.id,
          })
          .then(() => {
            this.smsDao
              .create({
                code,
                expired,
                userId: item.id,
              })
              .then(() => {
                res.json({
                  OK: true,
                });
              });
          })
          .catch(next);
      })
      .catch(next);
  });
};

AuthController.prototype.checkCode = function (req, res, next) {
  const { code, email } = req.body;

  this.dao
    .find({
      email,
    })
    .then((item) => {
      if (!item) res.status(400).json({ message: "Invalid data" });
      this.smsDao
        .find({
          code,
          userId: item.id,
        })
        .then((smsCode) => {
          if (!smsCode) res.status(400).json({ message: "Invalid data" });
          const today = new Date();
          const expired = new Date(smsCode.expired);

          if (today.getTime() > expired.getTime())
            res.status(400).json({ message: "Invalid data" });

          const token = jwt.sign(
            {
              userId: smsCode.userId,
            },
            TOKEN_SECRET_KEY,
            { expiresIn: "1h" }
          );

          this.smsDao.delete({ id: smsCode.id });

          res.json({
            token,
          });
        });
    });
};

AuthController.prototype.checkAuth = function (req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    next(new Error('Unauthorized'))
    return;
  }
  try {
    const [_, token] = req.headers.authorization?.split(' ')

    if (!token) {
      next(new Error('Unauthorized'))
      return;
    }

    const { userId } = jwt.verify(token, TOKEN_SECRET_KEY);

    this.dao.find({
      id: userId
    }).then((user) => {
      req.user = user
      next()
    })
  } catch (err) {
    next(err)
  }
};


AuthController.prototype.me = function (req, res, next) {
  if (req.user) {
    res.json(req.user)
  }
  next(new Error('Unauthorized'))
};

module.exports = {
  AuthController,
};
