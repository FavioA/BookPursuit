import { gql } from '@apollo/client';

// Query to request information about the currently authenticated user's profile
export const QUERY_ME = gql`
{
    me {
        _id
        username
        email
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
        }
    }
}`;