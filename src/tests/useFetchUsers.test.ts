import { renderHook, waitFor } from '@testing-library/react';
import { useFetchUsers } from '../hooks/useFetchUsers';

describe('useFetchUsers', () => {
    const mockUsers = [
        { id: 1, name: 'User 1', user_stories: ['story1.jpg'] },
        { id: 2, name: 'User 2', user_stories: ['story2.jpg'] }
    ];

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockUsers)
            })
        ) as jest.Mock;
    });

    it('should fetch users and update state', async () => {
        const { result } = renderHook(() => useFetchUsers());

        expect(result.current).toEqual([]);

        await waitFor(() => {
            expect(result.current).toEqual(mockUsers);
        });
    });

    it('should call fetch with correct path', async () => {
        renderHook(() => useFetchUsers());

        expect(global.fetch).toHaveBeenCalledWith('/data/users.json');
    });
});