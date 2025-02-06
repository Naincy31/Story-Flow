import { renderHook } from '@testing-library/react';
import { useHandleStoryEnd } from '../hooks/useHandleStoryEnd';
import { UserStory } from '../types';

describe('useHandleStoryEnd', () => {
    const mockUsers: UserStory[] = [
        {
            id: 1, user_name: 'User 1', user_stories: ['story1.jpg'],
            user_dp: ''
        },
        {
            id: 2, user_name: 'User 2', user_stories: ['story2.jpg'],
            user_dp: ''
        },
        {
            id: 3, user_name: 'User 3', user_stories: ['story3.jpg'],
            user_dp: ''
        }
    ];

    it('should move to next user when current story ends', () => {
        const setSelectedUser = jest.fn();
        const selectedUser = mockUsers[0];

        const { result } = renderHook(() => 
            useHandleStoryEnd(mockUsers, selectedUser, setSelectedUser)
        );

        result.current.handleStoryEnd();
        expect(setSelectedUser).toHaveBeenCalledWith(mockUsers[1]);
    });

    it('should close stories when last user story ends', () => {
        const setSelectedUser = jest.fn();
        const selectedUser = mockUsers[2]; // Last user

        const { result } = renderHook(() => 
            useHandleStoryEnd(mockUsers, selectedUser, setSelectedUser)
        );

        result.current.handleStoryEnd();
        expect(setSelectedUser).toHaveBeenCalledWith(null);
    });

    it('should do nothing when selectedUser is null', () => {
        const setSelectedUser = jest.fn();
        const selectedUser = null;

        const { result } = renderHook(() => 
            useHandleStoryEnd(mockUsers, selectedUser, setSelectedUser)
        );

        result.current.handleStoryEnd();
        expect(setSelectedUser).not.toHaveBeenCalled();
    });
});