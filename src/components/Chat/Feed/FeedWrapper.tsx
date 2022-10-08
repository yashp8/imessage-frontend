import * as React from 'react';
import {Session} from "next-auth";

interface IFeedWrapperProps {
  session: Session
}

const FeedWrapper: React.FunctionComponent<IFeedWrapperProps> = ({session}) => {
  return (
      <div>feed wrapper</div>
  );
};

export default FeedWrapper;
