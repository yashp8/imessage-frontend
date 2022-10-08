import * as React from 'react';
import {Fragment, useState} from 'react';
import {
    Button, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Text,
} from '@chakra-ui/react';
import {useLazyQuery, useQuery} from "@apollo/client";
import UserOperations from '../../../../graphql/operations/user';
import {SearchUserData, SearchUserInput} from "../../../../util/types";
import UserSearchList from "./UserSearchList";

interface IModelProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConversationModel: React.FC<IModelProps> = ({isOpen, onClose}) => {
    const [username, setUsername] = useState('')
    const [searchUsers, {
        data,
        error,
        loading
    }] = useLazyQuery<SearchUserData, SearchUserInput>(UserOperations.Queries.searchUsers)
    // console.log(data)
    const onSearch = async (event: React.FormEvent) => {
        event.preventDefault();
        await searchUsers({variables: {username}});
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent bg='#2d2d2d' pb={4}>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <form onSubmit={onSearch}>
                        <Stack spacing={4}>
                            <Input
                                placeholder='Enter a username'
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                            <Button
                                type='submit'
                                disabled={!username}
                                isLoading={loading}
                            >Search</Button>
                        </Stack>
                    </form>
                    {data?.searchUsers && <UserSearchList users={data?.searchUsers}/>}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ConversationModel;
