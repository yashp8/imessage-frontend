import { gql } from '@apollo/client';
import { MessageFields } from "./messages";

// const ConversationFields = `
//     conversations {
//       id
//       participants {
//         user {
//           id
//           username
//         }
//         hasSeenLatestMessage
//       }
//       latestMessage {
//         id
//         sender {
//           id
//           username
//         }
//         body
//         createdAt
//       }
//       updatedAt
//     }
// `;

const ConversationFields = `
  id
  updatedAt
  participants {
    user {
      id
      username
    }
    hasSeenLatestMessage
  }
  latestMessage {
    ${MessageFields}
  }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  Queries: {
    conversations: gql`
      query Conversations {
        conversations {
          ${ConversationFields}
        }
      }
    `,
  },
  Mutation: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    ConversationCreated: gql`
      subscription ConversationCreated {
        conversationCreated {
          ${ConversationFields}
        }
      }
      `,
  },
};
