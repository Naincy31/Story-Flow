import { renderHook, act } from '@testing-library/react';
import { useSeenUsers } from '../hooks/useSeenUsers';

describe('useSeenUsers', () => {
    it('should initialize with empty set', () => {
        const { result } = renderHook(() => useSeenUsers());
        expect(result.current.seenUsers.size).toBe(0);
    });

    it('should mark user as seen', () => {
        const { result } = renderHook(() => useSeenUsers());

        act(() => {
            result.current.markUserAsSeen(1);
        });

        expect(result.current.seenUsers.has(1)).toBe(true);
    });

    it('should not duplicate seen users', () => {
        const { result } = renderHook(() => useSeenUsers());

        act(() => {
            result.current.markUserAsSeen(1);
            result.current.markUserAsSeen(1);
        });

        expect(result.current.seenUsers.size).toBe(1);
    });
});