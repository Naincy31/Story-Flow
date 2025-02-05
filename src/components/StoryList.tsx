import React, { useState, useEffect } from 'react';
import { UserStory } from '../types.ts';

const StoryList: React.FC<{ onSelectUser: (user: UserStory) => void }> = ({ onSelectUser }) => {
    const [users, setUsers] = useState<UserStory[]>([]);

    useEffect(() => {
        
        fetch('/data/users.json')
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error('Error loading stories: ', err));
    }, []);

    const handleUserSelection = (user: UserStory) => {
        onSelectUser(user);
    };

    return (
        <div className="StoryList">
            {users.map((user) => (
                <div key={user.id} className="story-item" onClick={() => handleUserSelection(user)}>
                    <div className="story-image-container">
                        <img src={user.user_dp} alt={user.user_name}/>
                    </div>
                    <p>{user.user_name}</p>
                </div>
            ))}
        </div>
    );
};

export default StoryList;
