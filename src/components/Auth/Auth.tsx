import React, {Fragment, useState} from 'react';
import {Button, Center, Stack, Text, Image, Input} from '@chakra-ui/react';
import {Session} from 'next-auth';
import {signIn} from 'next-auth/react';
import {useMutation} from '@apollo/client';
import UserOperations from '../../graphql/operations/user';
import {CreateUsernameData, CreateUsernameVariable} from '../../util/types';
import {AppError} from "../../util/appError";
import {AppMessage} from "../../util/appMessage";

export interface IAuthProps {
    session: Session | null;
    reloadSession: () => void;
}

const Auth: React.FC<IAuthProps> = ({session, reloadSession}) => {
    const [username, setUserName] = useState('');

    const [createUsername, {loading, error}] = useMutation<CreateUsernameData,
        CreateUsernameVariable>(UserOperations.Mutation.CreateUsername);

    const onUserNameChange = (event: any) => {
        setUserName(event.target.value);
    };

    const onSubmit = async () => {
        if (!username) return;
        try {
            const {data} = await createUsername({variables: {username}});
            if (!data?.createUsername) {
                throw new Error();
            }

            if (data.createUsername.error) {
                const {
                    createUsername: {error},
                } = data;
                throw new Error(error);
            }
            // Reload session to obtain new username
            reloadSession();
            new AppMessage('Username created', 1);
        } catch (error: any) {
            new AppError(error.message, 500)
            // console.log('submit error', error);
        }
    };

    return (
        <Center height='100vh'>
            <Stack spacing={8} align='center'>
                {session ? (
                    <Fragment>
                        <Text fontSize='3xl'> Create username</Text>
                        <Input
                            placeholder='Enter username'
                            value={username}
                            //   onChange={(event) => setUserName(event.target.value)}
                            onChange={onUserNameChange}
                        />
                        <Button width='100%' onClick={onSubmit} isLoading={loading}>
                            Save
                        </Button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Text fontSize='3xl'> MessengerQL</Text>
                        <Button
                            onClick={() => signIn('google')}
                            leftIcon={
                                <Image
                                    height='20px'
                                    src='/images/google.png'
                                    alt='google-image'
                                />
                            }
                        >
                            Continue with Google
                        </Button>

                        <Button
                            onClick={() => signIn('facebook')}
                            leftIcon={
                                <Image
                                    height='20px'
                                    src='/images/facebook.png'
                                    alt='google-image'
                                />
                            }
                        >
                            Continue with Facebook
                        </Button>

                    </Fragment>
                )}
            </Stack>
        </Center>
    );
};

export default Auth;
