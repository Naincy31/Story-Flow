import React, { useState, useEffect } from 'react';
import './App.css';
import StoryList from './components/StoryList.tsx';
import StoryView from './components/StoryView.tsx';
import { UserStory } from './types';

function App() {
    const [users, setUsers] = useState<UserStory[]>([])
    const [selectedUser, setSelectedUser] = useState<UserStory | null>(null)
    const [seenUsers, setSeenUsers] = useState<Set<number>>(new Set())

    useEffect(() => {
        fetch('/data/users.json')
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error('Error loading users data: ', err))
    }, []);

    const markUserAsSeen = (userId: number) => {
        setSeenUsers((prevSeenUsers) => {
            const updatedSeenUsers = new Set(prevSeenUsers)
            updatedSeenUsers.add(userId)
            return updatedSeenUsers
        });
    };

    const handleStoryEnd = () => {
        const currentUserIndex = users.findIndex((user) => user.id === selectedUser?.id)
        const nextUserIndex = currentUserIndex + 1;
        if (nextUserIndex < users.length) {
            setSelectedUser(users[nextUserIndex]);
        } else {
            setSelectedUser(null)
        }
    };

    useEffect(() => {
        console.log(selectedUser);
        
    }, [selectedUser])

    return (
        <div className="App">
            <StoryList onSelectUser={setSelectedUser} seenUsers={seenUsers} />
            {selectedUser && (
                <StoryView
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    markUserAsSeen={markUserAsSeen}
                    setSelectedUser={setSelectedUser}
                    onStoryEnd={handleStoryEnd}
                />
            )}
        </div>
    );
}

export default App;
