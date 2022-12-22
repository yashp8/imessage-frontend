import * as React from 'react';
import { Session } from 'next-auth';
import { Box } from '@chakra-ui/react';
import ConversationList from './ConversationList';
import { useQuery } from '@apollo/client';
import ConversationOperation from '../../../graphql/operations/conversation';
import { ConversationsData } from '../../../util/types';
import { useRouter } from 'next/router';

interface IConversationWrapperProps {
  session: Session;
}

const ConversationWrapper: React.FC<IConversationWrapperProps> = ({
  session,
}) => {
  const router = useRouter();
  const {
    query: { conversationId },
  } = router;
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<ConversationsData, null>(
    ConversationOperation.Queries.conversations,
  );

  const onViewConversation = async (conversationId: string) => {
    router.push({
      query: {
        conversationId,
      },
    });
  };

  const subscribeToNewConversation = () => {
    subscribeToMore({
      document: ConversationOperation.Subscriptions.ConversationCreated,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: { subscriptionData: { data: { conversationCreated: any } } },
      ) => {
        if (!subscriptionData) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [newConversation, ...prev.conversations],
        });
      },
    });
  };

  React.useEffect(() => {
    subscribeToNewConversation();
  }, []);

  return (
    <Box
      display={{ base: conversationId ? 'none' : 'flex', md: 'flex' }}
      width={{ base: '100%', md: '400px' }}
      bg='whiteAlpha.50'
      py={6}
      px={3}
    >
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
        onViewConversation={onViewConversation}
      />
    </Box>
  );
};

export default ConversationWrapper;
