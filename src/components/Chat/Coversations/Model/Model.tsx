import * as React from 'react';
import { Fragment, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import UserOperations from '../../../../graphql/operations/user';
import {
  CreateConversationData,
  CreateConversationInput,
  SearchUser,
  SearchUserData,
  SearchUserInput,
} from '../../../../util/types';
import UserSearchList from './UserSearchList';
import Participants from './Participants';
import { tryCatch } from 'rxjs/internal-compatibility';
import { AppError } from '../../../../util/appError';
import CreateConversation from '../../../../graphql/operations/conversation';
import { Session } from 'next-auth';

interface IModelProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

const ConversationModel: React.FC<IModelProps> = ({
  session,
  isOpen,
  onClose,
}) => {
  const {
    user: { id: userId },
  } = session;
  const [username, setUsername] = useState('');

  const [participants, setParticipant] = useState<Array<SearchUser>>([]);

  const [searchUsers, { data, error, loading }] = useLazyQuery<
    SearchUserData,
    SearchUserInput
  >(UserOperations.Queries.searchUsers);

  const [createConversation, { loading: conversationLoading }] = useMutation<
    CreateConversationData,
    CreateConversationInput
  >(CreateConversation.Mutation.createConversation);

  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    await searchUsers({ variables: { username } });
  };

  const addParticipant = (user: SearchUser) => {
    setParticipant((prev) => [...prev, user]);
    setUsername('');
  };

  const removeParticipant = (userId: string) => {
    setParticipant((prev) => prev.filter((p) => p.id !== userId));
  };

  const onCreateConversation = async () => {
    const participantIds = [userId, ...participants.map((p) => p.id)];
    try {
      const { data } = await createConversation({
        variables: { participantIds },
      });
    } catch (err: any) {
      new AppError(err?.message, 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg='#2d2d2d' pb={4}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSearch}>
            <Stack spacing={4}>
              <Input
                placeholder='Enter a username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <Button type='submit' disabled={!username} isLoading={loading}>
                Search
              </Button>
            </Stack>
          </form>
          {data?.searchUsers && (
            <UserSearchList
              users={data?.searchUsers}
              addParticipant={addParticipant}
            />
          )}
          {participants.length !== 0 && (
            <Fragment>
              <Participants
                participants={participants}
                removeParticipant={removeParticipant}
              />
              <Button
                color='brand.100'
                width='100%'
                mt={6}
                _hover={{ bg: 'brand.100' }}
                isLoading={conversationLoading}
                onClick={onCreateConversation}
              >
                Create Conversation
              </Button>
            </Fragment>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConversationModel;
