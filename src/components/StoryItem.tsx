import React from 'react';
import { UserStory } from '../types';

interface StoryItemProps {
    user: UserStory;
    onSelectUser: (user: UserStory) => void;
    seenUsers: Set<number>;
}

const StoryItem: React.FC<StoryItemProps> = ({ user, onSelectUser, seenUsers }) => {
    return (
        <div className="story-item" onClick={() => onSelectUser(user)}>
            <div className={`story-image-container ${seenUsers.has(user.id) ? 'seen' : ''}`}>
                <img src={user.user_dp} alt={user.user_name} className={seenUsers.has(user.id) ? 'gray-scale' : ''} />
            </div>
            <p>{user.user_name}</p>
        </div>
    );
};

export default StoryItem;
