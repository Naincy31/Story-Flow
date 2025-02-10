import React, { useContext } from 'react';
import './App.css';
import StoryList from './components/StoryList.tsx';
import StoryView from './components/StoryView.tsx';
import { StoryContext } from './context/StoryContext.tsx';

function App() {
    const { selectedUser, setSelectedUser, markUserAsSeen, users } = useContext(StoryContext)

    return (
        <div className="App">
            {
                selectedUser ? 
                (
                    <StoryView
                        user={selectedUser}
                        users={users}
                        onClose={() => setSelectedUser(null)}
                        markUserAsSeen={markUserAsSeen}
                        setSelectedUser={setSelectedUser}
                    />
                )

                :

                <StoryList />
            }
        </div>
    );
}

export default App;