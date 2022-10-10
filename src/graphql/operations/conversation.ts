import { gql } from '@apollo/client';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Queries: {},
  Mutation: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]) {
        createConversation(participantsIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
