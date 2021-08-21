const serverlessExpress = require('@vendia/serverless-express')
const app = require('./lambda')

exports.handler = serverlessExpress({ app })