import { Box, Input, border } from '@chakra-ui/react';
import { Session } from 'next-auth';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AppError } from '../../../../util/appError';
import { useMutation } from '@apollo/client';
import { ObjectID } from 'bson';
import MessageOperations from '../../../../graphql/operations/messages';
import { MessagesData, SendMessageArguments } from '../../../../util/types';

interface MessageInputProp {
  session: Session;
  conversationId: string;
}

const MessageInput: React.FC<MessageInputProp> = ({
  session,
  conversationId,
}: MessageInputProp) => {
  const [messageBody, setMessageBody] = useState('');

  const [sendMessage] = useMutation<
    { sendMessage: boolean },
    SendMessageArguments
  >(MessageOperations.Mutations.sendMessage);

  const onSendMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // call sendMessage mutation
      const { id: senderId } = session.user;
      const messageId = new ObjectID().toString();
      const newMessage: SendMessageArguments = {
        id: messageId,
        senderId,
        conversationId,
        body: messageBody,
      };

      // Clear input state
      setMessageBody('');

      const { data, errors } = await sendMessage({
        variables: {
          ...newMessage,
        },
        optimisticResponse: {
          sendMessage: true,
        },
        update: (cache) => {
          const existing = cache.readQuery<MessagesData>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
          }) as MessagesData;

          // let mutatedMessages = [];

          // const isExistMessage = existing.messages.find((e) => e.id === messageId);

          // if(!isExistMessage) {
          //   mutatedMessages = existing.messages
          //   existing.messages.push({
          //     id: messageId,
          //     body: messageBody,
          //     senderId: session.user.id,
          //     conversationId,
          //     sender: {
          //       id: session.user.id,
          //       username: session.user.username,
          //     },
          //     createdAt: new Date(Date.now()),
          //     updatedAt: new Date(Date.now()),
          //   })
          // } else {
          //   mutatedMessages = existing.messages
          // }

          cache.writeQuery<MessagesData, { conversationId: string }>({
            query: MessageOperations.Query.messages,
            variables: { conversationId },
            data: {
              ...existing,
              messages: [
                {
                  id: messageId,
                  body: messageBody,
                  senderId: session.user.id,
                  conversationId,
                  sender: {
                    id: session.user.id,
                    username: session.user.username,
                  },
                  conversation: {
                    id: conversationId
                  },
                  createdAt: new Date(Date.now()),
                  updatedAt: new Date(Date.now()),
                },
                ...existing.messages,
              ],
            },
          });
        },
      });

      if (!data?.sendMessage || errors) {
        throw new Error('Failed to send message');
      }
    } catch (error: any) {
      console.log('onSendMessage error', error);
      toast.error(error?.message);
    }
  };

  return (
    <Box px={4} py={6} width='100%'>
      <form onSubmit={onSendMessage}>
        <Input
          value={messageBody}
          placeholder='New message'
          size='md'
          onChange={(event) => setMessageBody(event.target.value)}
          resize='none'
          _focus={{
            boxShadow: 'none',
            border: '1px solid',
            borderColor: 'whiteAlpha.300',
          }}
          _hover={{
            borderColor: 'whiteAlpha.300',
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
