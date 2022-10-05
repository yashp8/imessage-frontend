import { Button } from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
interface IAuthProps {}

const Auth: React.FC<IAuthProps> = (props) => {
  return (
    <div>
      Auth
      <Button onClick={() => signIn('google')}>Sign In</Button>
    </div>
  );
};

export default Auth;
