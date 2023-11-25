const express = require('express');
const path = require('path');
// Import the two parts of the GraphQL schema
const { typeDefs,resolvers } require('./schemas');
const db = require('./config/connection');

// const routes = require('./routes');

// Imported the ApolloServer
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require ('@apollo/server/express4');
const { authMiddleware } = require ('./utils/auth');

const app = express();

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Instance of Apollo Server with GraphQL schema
const startApolloServer = aync () => {
  await server.start();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure Express.js server to use Apollo Server middleware for handling GraphQL request
app.use('/graphql', expressMiddleware(server, {
  context: authMiddleware
}));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(_dirname, '../client/dist/index.html'));
  });
}

// app.use(routes);

db.once('open', () =>{
  app.listen(PORT, () => {
  console.log(`🌍 Now listening on localhost:${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();