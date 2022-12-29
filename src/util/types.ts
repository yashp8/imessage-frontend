// user
export interface CreateUsernameData {
  createUsername: {
    success: Boolean;
    error: string;
  };
}

export interface CreateUsernameVariable {
  username: string;
}

export interface SearchUserInput {
  username: string;
}

export interface SearchUserData {
  searchUsers: Array<SearchUser>;
}

export interface SearchUser {
  id: string;
  username: string;
}

// conversation

export interface ConversationPopulated {
  id: string,
  participants: any,
  latestMessage: any,
}

export interface ConversationsData {
  conversations: Array<any>;
}

export interface CreateConversationData {
  createConversation: {
    conversationId: String;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

export interface ConversationUpdatedData {
  conversationUpdated: {
    conversation: Omit<ConversationPopulated, "latestMessage"> & {
      latestMessage: any;
    };
    addedUserIds: Array<string> | null;
    removedUserIds: Array<string> | null;
  };
}

export interface ConversationDeletedData {
  conversationDeleted: {
    id: string;
  }
}

// messages

export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  conversation?: {
    id: string
  }
}
export interface MessagesData {
  messages: Array<any>;
}

export interface MessagesVariable {
  conversationId: string;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: messagePopulated;
    };
  };
}

export interface messagePopulated {
  sender: {
    id: any
    username: any,
  },
  id?: string,
  conversation: {
    id: string
  }
}
