import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
        }
    }  
`;

export const SAVE_BOOK = gql`
    mutation SaveBook($input: saveBookInput) {
            saveBook(input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                _id
                authors
                description
                bookId
                image
                title
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation Mutation($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
            bookCount
            savedBooks {
                _id
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`;
