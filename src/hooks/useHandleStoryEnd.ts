import { UserStory } from '../types';

export const useHandleStoryEnd = (
    users: UserStory[],
    selectedUser: UserStory | null,
    setSelectedUser: (user: UserStory | null) => void
) => {
    const handleStoryEnd = () => {
        if (!selectedUser) return;

        const currentUserIndex = users.findIndex((user) => user.id === selectedUser.id);
        const nextUserIndex = currentUserIndex + 1;
        if (nextUserIndex < users.length) {
            setSelectedUser(users[nextUserIndex]);
        } else {
            setSelectedUser(null);
        }
    };

    return { handleStoryEnd };
};