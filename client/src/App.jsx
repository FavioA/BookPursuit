import './App.css';
import { Outlet } from 'react-router-dom';
// 
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Navbar from './components/Navbar';

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// construct request middleware that will attach the JWT token to every request as an 'authorization' header
const authLink = setContext((_, { headers }) =>{
  // get the authorization token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so the httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
})
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
