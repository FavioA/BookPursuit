// Import GraphQL schema and resolvers from separate files and exporting them as a single object.
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers};