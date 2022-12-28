import * as React from 'react';
import { Session } from 'next-auth';
import { Box, Button, Text } from '@chakra-ui/react';
import ConversationModel from './Model/Model';
import { useState } from 'react';
import ConversationItem from './ConversationItems';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import ConversationOperations from '../../../graphql/operations/conversation';
import { signOut } from 'next-auth/react';

interface IConversationListProps {
  session: Session;
  conversations: Array<any>;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean,
  ) => Promise<void>;
}

const ConversationList: React.FunctionComponent<IConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteConversation] = useMutation<{
    deleteConversation: boolean;
    conversationId: string;
  }>(ConversationOperations.Mutation.deleteConversation);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const {
    user: { id: userId },
  } = session;

  const onDeleteConversation = async (conversationId: string) => {
    try {
      toast.promise(
        deleteConversation({
          variables: {
            conversationId,
          },
          update: () => {
            router.replace(
              typeof process.env.NEXT_PUBLIC_BASE_URL === 'string'
                ? process.env.NEXT_PUBLIC_BASE_URL
                : '',
            );
          },
        }),
        {
          loading: 'Deleting conversation',
          success: 'Conversation deleted',
          error: 'Failed to delete conversation',
        },
      );
    } catch (error) {
      console.log('onDeleteConversation error', error);
    }
  };

  const sortedConversations = [...conversations].sort(
    (a, b) => b.updatedAt.valueOf() - a.updatedAt.valueOf(),
  );

  return (
    <Box width='100%'>
      <Box
        py={2}
        px={4}
        mb={4}
        bg={'blackAlpha.300'}
        borderRadius={4}
        cursor='pointer'
        onClick={onOpen}
      >
        <Text textAlign='center' color='whiteAlpha.800' fontWeight={500}>
          Find or start conversation
        </Text>
      </Box>
      <ConversationModel session={session} isOpen={isOpen} onClose={onClose} />
      {sortedConversations &&
        sortedConversations.map((conversation, i) => {
          const participant = conversation.participants.find(
            (p: any) => p.user.id === userId,
          );

          return (
            <ConversationItem
              key={i}
              conversation={conversation}
              userId={userId}
              onClick={() =>
                onViewConversation(
                  conversation.id,
                  participant?.hasSeenLatestMessage,
                )
              }
              isSelected={conversation.id === router.query.conversationId}
              hasSeenLatestMessage={participant?.hasSeenLatestMessage}
              onDeleteConversation={onDeleteConversation}
            />
          );
        })}
      <Box position='absolute' bottom={0} left={0} width='100%' px={8}>
        <Button width='100%' onClick={() => {signOut()}}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationList;
