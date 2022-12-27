import * as React from 'react';
import { Session } from 'next-auth';
import { Box, Text } from '@chakra-ui/react';
import ConversationModel from './Model/Model';
import { useState } from 'react';
import ConversationItem from './ConversationItems';
import { useRouter } from 'next/router';

interface IConversationListProps {
  session: Session;
  conversations: Array<any>;
  onViewConversation: (
    conversationId: string,
    hasSeenLatestMessage: boolean | undefined,
  ) => void;
}

const ConversationList: React.FunctionComponent<IConversationListProps> = ({
  session,
  conversations,
  onViewConversation,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const {
    user: { id: userId },
  } = session;

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
        sortedConversations.map((conversation) => {
          const participant = conversation.participants.find(
            (p: any) => p.user.id === userId,
          );

          return (
            <ConversationItem
              key={conversation.id}
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
              onDeleteConversation={function (conversationId: string): void {
                throw new Error('Function not implemented.');
              }}
            />
          );
        })}
    </Box>
  );
};

export default ConversationList;
