import React from "react";
import {Button, Flex} from '@chakra-ui/react';
import {signOut} from 'next-auth/react';
import {AppError} from "../../util/appError";
import ConversationWrapper from "./Coversations/ConversationWrapper";
import FeedWrapper from "./Feed/FeedWrapper";
import {Session} from "next-auth";

interface IChatProps {
    session: Session
}

const Chat: React.FC<IChatProps> = ({session}) => {
    return (
        <Flex height='100vh'>
            <ConversationWrapper session={session}/>
            <FeedWrapper session={session}/>
        </Flex>
    );
};

export default Chat;
