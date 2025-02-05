import React, { useState, useEffect } from 'react';
import { UserStory } from '../types';

const StoryList: React.FC<{ onSelectUser: (user: UserStory) => void; seenUsers: Set<number> }> = ({ onSelectUser, seenUsers }) => {
    const [users, setUsers] = useState<UserStory[]>([])

    useEffect(() => {
        
        fetch('/data/users.json')
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error('Error loading stories: ', err))
    }, []);

    const handleUserSelection = (user: UserStory) => {
        onSelectUser(user)
    };

    const sortedUsers = [...users].sort((a, b) => {
        const aSeen = seenUsers.has(a.id)
        const bSeen = seenUsers.has(b.id)
        return aSeen === bSeen ? 0 : aSeen ? 1 : -1
    });

    return (
        <div className="StoryList">
            {sortedUsers.map((user) => (
                <div key={user.id} className="story-item" onClick={() => handleUserSelection(user)}>
                    <div className={`story-image-container ${seenUsers.has(user.id) ? 'seen' : ''}`}>
                        <img src={user.user_dp} alt={user.user_name} className={seenUsers.has(user.id) ? 'gray-scale' : ''} />
                    </div>
                    <p>{user.user_name}</p>
                </div>
            ))}
        </div>
    );
};

export default StoryList;
