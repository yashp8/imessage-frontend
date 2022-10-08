import {gql} from '@apollo/client'

export default {
    Queries: {
        searchUsers: gql`
            query SearchUsers($username: String!) {
                searchUsers(username: $username) {
                    id
                    username
                }
            }
        `
    },
    Mutation: {
        CreateUsername: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }
        `
    },
    Subscriptions: {}
}