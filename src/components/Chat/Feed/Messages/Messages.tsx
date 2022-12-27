import { useQuery } from '@apollo/client';
import { Flex, Stack } from '@chakra-ui/react';
import {
  MessageSubscriptionData,
  MessagesData,
  MessagesVariable,
} from '../../../../util/types';
import MessageOprations from '../../../../graphql/operations/messages';
import { AppError } from '../../../../util/appError';
import SkeletonLoader from '../../../common/SkeletonLoader';
import { useEffect } from 'react';
import MessageItem from './MessageItem';

interface MessagesProps {
  userId: string;
  conversationId: string;
}

const Messages: React.FC<MessagesProps> = ({ userId, conversationId }) => {
  const { data, loading, error, subscribeToMore } = useQuery<
    MessagesData,
    MessagesVariable
  >(MessageOprations.Query.messages, {
    variables: {
      conversationId,
    },
    onError: ({ message }) => {
      new AppError(message, 500);
    },
    //   onCompleted: () => {},
  });

  const subscribeToMoreMessage = (conversationId: string) => {
    subscribeToMore({
      document: MessageOprations.Subscriptions.messageSent,
      variables: {
        conversationId,
      },
      updateQuery: (prev, { subscriptionData }: MessageSubscriptionData) => {
        if (!subscriptionData) {
          return prev;
        }

        const newMessage = subscriptionData.data.messageSent;

        return Object.assign({}, prev, {
          messages:
            newMessage.sender.id === userId
              ? prev.messages
              : [newMessage, ...prev.messages],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToMoreMessage(conversationId);
  }, [conversationId]);


  if (error) {
    return null;
  }

  return (
    <Flex direction='column' justify='flex-end' overflow='hidden'>
      {loading && (
        <Stack spacing={4} p={4}>
          <SkeletonLoader count={7} height='60px' />
        </Stack>
      )}
      {data?.messages && (
        <Flex direction='column-reverse' overflowY='scroll' height='100%'>
          {data.messages.map((message) => (
            <MessageItem
              key={message}
              message={message}
              sentByMe={message.sender.id === userId}
            />
            // <div key={message.body}>{message.body}</div>
          ))}
        </Flex>
      )}
    </Flex>
  );
};

export default Messages;
