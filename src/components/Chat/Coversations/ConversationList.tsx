import * as React from 'react';
import { Session } from 'next-auth';
import { Box, Text } from '@chakra-ui/react';
import ConversationModel from './Model/Model';
import { useState } from 'react';
import ConversationItem from './ConversationItems';
import { useRouter } from 'next/router';

interface IConversationListProps {
  session: Session;
  conversations?: Array<any>;
  onViewConversation: (conversationId: string) => void;
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
      {conversations &&
        conversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            userId={userId}
            onClick={() => onViewConversation(conversation.id)}
            isSelected={conversation.id === router.query.conversationId}
            hasSeenLatestMessage={undefined}
            onDeleteConversation={function (conversationId: string): void {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
    </Box>
  );
};

export default ConversationList;
