// user
export interface CreateUsernameData {
    createUsername: {
        success: Boolean,
        error: string
    }
}

export interface CreateUsernameVariable {
    username: string
}

export interface SearchUserInput {
    username: string
}

export interface SearchUserData {
    searchUsers: Array<SearchUser>
}

export interface SearchUser {
    id: string,
    username: string
}

// conversation

export interface CreateConversationData {
    createConversation: {
        conversationId: String;
    }
}

export interface CreateConversationInput {
    participantIds: Array<string>
}