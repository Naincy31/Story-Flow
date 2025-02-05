import React, { useEffect, useState } from 'react';
import { UserStory } from '../types';

interface StoryViewProps {
    user: UserStory;
    onClose: () => void;
    markUserAsSeen: (userId: number) => void;
    onStoryEnd: () => void;
}

const StoryView: React.FC<StoryViewProps> = ({ user, onClose, markUserAsSeen, onStoryEnd }) => {
    const [storyIndex, setStoryIndex] = useState(0)
    const totalStories = user.user_stories.length

    useEffect(() => {
        const timer = setTimeout(() => {
            if (storyIndex < totalStories - 1) {
                setStoryIndex(prev => prev + 1)
            } else {
                markUserAsSeen(user.id);
                onStoryEnd()
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [storyIndex, totalStories, markUserAsSeen, onStoryEnd])

    const goPrev = () => {
        if (storyIndex <= 0) return;
        setStoryIndex(prev => prev - 1)
    };

    const goNext = () => {
        if (storyIndex < totalStories - 1) {
            setStoryIndex(prev => prev + 1)
        } else {
            markUserAsSeen(user.id);
            onStoryEnd()
        }
    };

    const goToStory = (index: number) => {
        setStoryIndex(index)
    };

    return (
        <div className="StoryView">
            <span onClick={() => {
                if(storyIndex === (totalStories - 1)) markUserAsSeen(user.id)
                onClose()
            }} className='story-close-icon'>X</span>
            <div className="overlay left" onClick={goPrev}></div>
            <div className="story-display-container">
                <div className="story-bar" style={{ gridTemplateColumns: `repeat(${totalStories}, 1fr)` }}>
                    {user.user_stories.map((_, index) => (
                        <span key={index} className={`story-item-bar ${index <= storyIndex ? 'active' : ''}`} onClick={() => goToStory(index)}></span>
                    ))}
                </div>
                <div className="user-story-info">
                    <img src={user.user_dp} alt={user.user_name} className="user-dp" />
                    <p className="story-user-name">{user.user_name}</p>
                </div>
                <img src={user.user_stories[storyIndex]} alt={`Story ${storyIndex + 1}`} className="story-image" />
            </div>
            <div className="overlay right" onClick={goNext}></div>
        </div>
    );
};

export default StoryView
