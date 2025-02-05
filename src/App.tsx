import React, { useState } from 'react';
import './App.css';
import StoryList from './components/StoryList.tsx';
import StoryView from './components/StoryView.tsx';
import { UserStory } from './types.ts';

function App() {
  const [selectedUser, setSelectedUser] = useState<UserStory | null>(null)

  return (
    <div className="App">
        <StoryList onSelectUser={setSelectedUser}/>
        {selectedUser && <StoryView user={selectedUser} onClose={() => setSelectedUser(null)}/>}
    </div>
  );
}

export default App;
