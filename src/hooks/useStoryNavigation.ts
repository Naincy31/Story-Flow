import { useState, useEffect } from 'react';
import { UserStory } from '../types';

export const useStoryNavigation = (
    user: UserStory,
    markUserAsSeen: (userId: number) => void,
    onStoryEnd: () => void
) => {
    const [storyIndex, setStoryIndex] = useState(0)
    const totalStories = user.user_stories.length

    useEffect(() => {
        const timer = setTimeout(() => {
            if (storyIndex < totalStories - 1) {
                setStoryIndex(prev => prev + 1)
            } else {
                markUserAsSeen(user.id)
                onStoryEnd()
            }
        }, 5000)

        return () => clearTimeout(timer)
    }, [storyIndex, totalStories, markUserAsSeen, onStoryEnd])

    const goPrev = () => {
        if (storyIndex > 0) {
            setStoryIndex(prev => prev - 1)
        }
    }

    const goNext = () => {
        if (storyIndex < totalStories - 1) {
            setStoryIndex(prev => prev + 1)
        } else {
            markUserAsSeen(user.id)
            onStoryEnd()
        }
    }

    const goToStory = (index: number) => {
        setStoryIndex(index)
    }

    return {
        storyIndex,
        goPrev,
        goNext,
        goToStory,
    }
}