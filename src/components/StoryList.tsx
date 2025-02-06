import React, {useContext} from 'react';
import { StoryContext } from '../context/StoryContext.tsx';
import StoryItem from './StoryItem.tsx';

const StoryList: React.FC = () => {
    const { users, seenUsers, setSelectedUser } = useContext(StoryContext)

    const sortedUsers = [...users].sort((a, b) => {
        const aSeen = seenUsers.has(a.id)
        const bSeen = seenUsers.has(b.id)
        return aSeen === bSeen ? 0 : aSeen ? 1 : -1
    });

    return (
        <div className="StoryList">
            {sortedUsers.map((user) => (
               <StoryItem key={user.id} user={user} onSelectUser={setSelectedUser} seenUsers={seenUsers} />
            ))}
        </div>
    )
}

export default StoryList;
