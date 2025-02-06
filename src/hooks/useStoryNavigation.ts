import { useState, useEffect } from 'react';
import { UserStory } from '../types';

export const useStoryNavigation = (
    user: UserStory,
    markUserAsSeen: (userId: number) => void,
    onStoryEnd: () => void
) => {
    const [storyIndex, setStoryIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const totalStories = user.user_stories.length

    useEffect(() => {
        setLoading(true)
    }, [storyIndex, user])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if(!loading){
            timer = setTimeout(() => {
                if (storyIndex < totalStories - 1) {
                    setStoryIndex(prev => prev + 1)
                } else {
                    markUserAsSeen(user.id)
                    onStoryEnd()
                }
            }, 5000)
        }

        return () => clearTimeout(timer)
    }, [storyIndex, totalStories, markUserAsSeen, onStoryEnd, loading])

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

    const handleImageLoad = () => {
        setLoading(false)
    }

    return {
        storyIndex,
        goPrev,
        goNext,
        goToStory,
        handleImageLoad,
        loading
    }
}