import * as React from 'react';
import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { SearchUser } from '../../../../util/types';
import { DeleteIcon } from '@chakra-ui/icons';
// import { IoIosCloseCircleOutline } from 'react-icons/all';

interface IParticipantsProps {
  participants: Array<SearchUser>;
  removeParticipant: (userId: string) => void;
}

const Participants: React.FunctionComponent<IParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  return (
    <Flex mt={8} gap='10px' flexWrap='wrap'>
      {participants.map((participant) => (
        <Stack
          key={participant.id}
          direction='row'
          align='center'
          bg='whiteAlpha.200'
          borderRadius={4}
        >
          <Text>{participant.username}</Text>
          <DeleteIcon
            cursor='pointer'
            onClick={() => removeParticipant(participant.id)}
          />
          {/* <IoIosCloseCircleOutline
            size={20}
            cursor='pointer'
            onClick={() => removeParticipant(participant.id)}
          /> */}
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
