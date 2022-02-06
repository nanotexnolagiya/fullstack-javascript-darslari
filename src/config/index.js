const TABLES = {
  USERS: 'Users',
  PROPERTIES: 'Properties',
  CATEGORIES: 'Categories',
  OFFERS: 'Offers',
  ANNOUNCEMENTS: 'Announcements',
  USER_SMS_CODES: 'UserSMSCodes',
  ANNOUNCEMENT_PROPERTY_VALUES: 'AnnouncementPropertyValues',
  OFFER_PROPERTY_VALUES: 'OfferPropertyValues',
  CATEGORIES_PROPERTIES: 'CategoriesProperties',
}

const TOKEN_SECRET_KEY = 'N7G217XGSD126X216E'

const SMTP = {
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: 'nanotexnolagiya',
    pass: 'EPPpqgg1vRsdhq75rr66',
  },
}

module.exports = {
  TABLES,
  TOKEN_SECRET_KEY,
  SMTP
}