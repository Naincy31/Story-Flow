import React from 'react';
import { UserStory } from '../types';
import { useStoryNavigation } from '../hooks/useStoryNavigation.ts';
import { useHandleStoryEnd } from '../hooks/useHandleStoryEnd.ts';

interface StoryViewProps {
    user: UserStory;
    users: UserStory[];
    onClose: () => void;
    markUserAsSeen: (userId: number) => void;
    setSelectedUser: (user: UserStory | null) => void;
}


const StoryView: React.FC<StoryViewProps> = ({ user, onClose, markUserAsSeen, users, setSelectedUser }) => {
    const { handleStoryEnd } = useHandleStoryEnd(users, user, setSelectedUser)
    const { storyIndex, goPrev, goNext, goToStory, loading, handleImageLoad } = useStoryNavigation(user, markUserAsSeen, handleStoryEnd)
    const totalStories = user.user_stories.length

    let touchStartY = 0
    let touchStartX = 0

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY = e.touches[0].clientY
        touchStartX = e.touches[0].clientX
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndY = e.changedTouches[0].clientY
        const touchEndX = e.changedTouches[0].clientX
        const deltaY = touchEndY - touchStartY
        const deltaX = touchEndX - touchStartX

        if (deltaY > 50) {
            if (storyIndex === totalStories - 1) markUserAsSeen(user.id)
            onClose()
        }

        if (deltaX > 50) {
            goPrev()
        } else if (deltaX < -50) {
            goNext()
        }
    }
    
    return (
        <div className="story-view" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <span onClick={() => {
                if (storyIndex === (totalStories - 1)) markUserAsSeen(user.id)
                onClose()
            }} className='story-close-icon'>X</span>
            <div className="story-display-container">
                <div className="story-bar" style={{ gridTemplateColumns: `repeat(${totalStories}, 1fr)` }}>
                    {user.user_stories.map((_, index: number) => (
                        <span key={index} className={`story-item-bar ${index <= storyIndex ? 'active' : ''}`} onClick={() => goToStory(index)}></span>
                    ))}
                </div>
                <div className="user-story-info">
                    <img src={user.user_dp} alt={user.user_name} className="user-dp" />
                    <p className="story-user-name">{user.user_name}</p>
                </div>
                {loading && <div className="loading-spinner"></div>}
                <img 
                    src={user.user_stories[storyIndex]} 
                    alt={`Story ${storyIndex + 1}`} 
                    className="story-image" 
                    onLoad={handleImageLoad}
                    onClick={(e) => {
                        if (e.clientX < window.innerWidth / 2) goPrev()
                        else goNext()
                    }}
                    style={{ display: loading ? 'none' : 'block' }}
                />
            </div>
        </div>
    );
};

export default StoryView