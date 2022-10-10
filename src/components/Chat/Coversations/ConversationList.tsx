import * as React from 'react';
import { Session } from 'next-auth';
import { Box, Text } from '@chakra-ui/react';
import ConversationModel from './Model/Model';
import { useState } from 'react';

interface IConversationListProps {
  session: Session;
}

const ConversationList: React.FunctionComponent<IConversationListProps> = ({
  session,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

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
    </Box>
  );
};

export default ConversationList;
