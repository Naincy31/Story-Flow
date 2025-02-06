import { renderHook, act } from '@testing-library/react';
import { useStoryNavigation } from '../hooks/useStoryNavigation';

jest.useFakeTimers();

describe('useStoryNavigation', () => {
    const mockUser = {
        id: 1,
        user_name: 'Test User',
        user_stories: ['story1.jpg', 'story2.jpg', 'story3.jpg'],
        user_dp: ''
    };
    const mockMarkUserAsSeen = jest.fn();
    const mockOnStoryEnd = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with correct state', () => {
        const { result } = renderHook(() => 
            useStoryNavigation(mockUser, mockMarkUserAsSeen, mockOnStoryEnd)
        );

        expect(result.current.storyIndex).toBe(0);
        expect(result.current.loading).toBe(true);
    });

    it('should handle image load', () => {
        const { result } = renderHook(() => 
            useStoryNavigation(mockUser, mockMarkUserAsSeen, mockOnStoryEnd)
        );

        act(() => {
            result.current.handleImageLoad();
        });

        expect(result.current.loading).toBe(false);
    });

    it('should navigate to next story', () => {
        const { result } = renderHook(() => 
            useStoryNavigation(mockUser, mockMarkUserAsSeen, mockOnStoryEnd)
        );

        act(() => {
            result.current.goNext();
        });

        expect(result.current.storyIndex).toBe(1);
    });

    it('should navigate to previous story', () => {
        const { result } = renderHook(() => 
            useStoryNavigation(mockUser, mockMarkUserAsSeen, mockOnStoryEnd)
        );

        // Move to second story first
        act(() => {
            result.current.goNext();
        });

        act(() => {
            result.current.goPrev();
        });

        expect(result.current.storyIndex).toBe(0);
    });
});