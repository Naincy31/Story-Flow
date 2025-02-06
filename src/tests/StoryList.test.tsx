import React from 'react';
import { render, screen } from '@testing-library/react';
import { StoryContext } from '../context/StoryContext';
import StoryList from '../components/StoryList';
import { UserStory } from '../types';

const mockUsers: UserStory[] = [
    {
        id: 1,
        user_name: 'akash',
        user_dp: '/assets/images/profiles/man1.jpg',
        user_stories: ['/assets/images/stories/superhero-no-gesture.jpg', '/assets/images/stories/superhero-heart-pain.jpg']
    },
    {
        id: 2,
        user_name: 'james',
        user_dp: '/assets/images/profiles/man2.jpg',
        user_stories: ['/assets/images/stories/superhero-angry.jpg', '/assets/images/stories/superhero-happy.jpg']
    },
    {
        id: 3,
        user_name: 'sara',
        user_dp: '/assets/images/profiles/woman1.jpg',
        user_stories: ['/assets/images/stories/superhero-sad.jpg', '/assets/images/stories/superhero-smile.jpg']
    }
];

const mockContextValue = {
    users: mockUsers,
    selectedUser: null,
    setSelectedUser: jest.fn(),
    seenUsers: new Set<number>(),
    markUserAsSeen: jest.fn(),
};

describe('StoryList', () => {
    it('renders story items', () => {
        render(
            <StoryContext.Provider value={mockContextValue}>
                <StoryList />
            </StoryContext.Provider>
        );

        const storyItems = screen.getAllByRole('img');
        expect(storyItems).toHaveLength(mockUsers.length);
    });
});