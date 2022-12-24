import * as React from 'react';
import { Session } from 'next-auth';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import MessagesHeader from './Messages/Header';
import MessageInput from './Messages/Input';
import Messages from './Messages/Messages';

interface IFeedWrapperProps {
  session: Session;
}

const FeedWrapper: React.FunctionComponent<IFeedWrapperProps> = ({
  session,
}) => {
  const router = useRouter();

  const { conversationId } = router.query;

  const {
    user: { id: userId },
  } = session;

  return (
    <Flex
      display={{ base: conversationId ? 'flex' : 'none', md: 'flex' }}
      width='100%'
      direction='column'
    >
      {conversationId && typeof conversationId === 'string' ? (
        <>
          <Flex
            direction='column'
            justifyContent='space-between'
            overflow='hidden'
            flexGrow={1}
          >
            <MessagesHeader userId={userId} conversationId={conversationId} />
            <Messages userId={userId} conversationId={conversationId} />
          </Flex>
          <MessageInput session={session} conversationId={conversationId} />
        </>
      ) : (
        <div>No conversation selected </div>
      )}
    </Flex>
  );
};

export default FeedWrapper;
