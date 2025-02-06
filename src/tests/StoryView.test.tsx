import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StoryView from '../components/StoryView';
import '@testing-library/jest-dom';
import { UserStory } from '../types';

const mockUser: UserStory = {
    id: 1,
    user_name: 'akash',
    user_dp: '/assets/images/profiles/man1.jpg',
    user_stories: ['/assets/images/stories/superhero-no-gesture.jpg', '/assets/images/stories/superhero-heart-pain.jpg']
};

const mockUsers: UserStory[] = [mockUser];

describe('StoryView', () => {
    it('renders story view', () => {
        render(
            <StoryView
                user={mockUser}
                users={mockUsers}
                onClose={jest.fn()}
                markUserAsSeen={jest.fn()}
                setSelectedUser={jest.fn()}
            />
        );

        const storyImage = screen.getByAltText('Story 1');
        expect(storyImage).toBeInTheDocument();
    });

    it('calls onClose when close icon is clicked', () => {
        const onClose = jest.fn();
        render(
            <StoryView
                user={mockUser}
                users={mockUsers}
                onClose={onClose}
                markUserAsSeen={jest.fn()}
                setSelectedUser={jest.fn()}
            />
        );

        const closeIcon = screen.getByText('X');
        fireEvent.click(closeIcon);
        expect(onClose).toHaveBeenCalled();
    });
});