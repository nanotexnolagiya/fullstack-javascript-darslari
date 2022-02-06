const { BaseDao } = require('../../Common/dao')
const { TABLES } = require('../../../config')

function SMSCodesDao () {
  BaseDao.call(this, TABLES.USER_SMS_CODES);
}

SMSCodesDao.prototype = Object.create(BaseDao.prototype);
SMSCodesDao.prototype.constructor = SMSCodesDao;


module.exports = {
  SMSCodesDao
}