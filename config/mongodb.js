module.exports = {
  'databaseUser': process.env.DATABASE_USER || '',
  'databaseName': process.env.DATABASE_NAME || 'pd_breja',
  'databasePassword': process.env.DATABASE_PASSWORD || '',
  'databaseHost': process.env.DATABASE_HOST || 'localhost',
  'databasePort': process.env.DATABASE_PORT || '27017',
  'mongoUri': process.env.MONGODB_URI || ''
};
