import { gql } from '@apollo/client'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Queries: {},
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