import React, { createContext, useState } from "react";
import { UserStory } from "../types";
import { useFetchUsers } from "../hooks/useFetchUsers.ts";
import { useSeenUsers } from "../hooks/useSeenUsers.ts";

interface StoryContextProps {
    users: UserStory[];
    selectedUser: UserStory | null;
    setSelectedUser: (user: UserStory | null) => void;
    seenUsers: Set<number>;
    markUserAsSeen: (userId: number) => void;
}

export const StoryContext = createContext<StoryContextProps | undefined>(undefined)

export const StoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const users = useFetchUsers()
    const { seenUsers, markUserAsSeen } = useSeenUsers()
    const [selectedUser, setSelectedUser] = useState<UserStory | null>(null)

    return (
        <StoryContext.Provider value={{ users, selectedUser, setSelectedUser, seenUsers, markUserAsSeen }}>
            {children}
        </StoryContext.Provider>
    );
};
