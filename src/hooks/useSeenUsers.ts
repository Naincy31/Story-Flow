import { useState } from 'react'

export const useSeenUsers = () => {
  const [seenUsers, setSeenUsers] = useState<Set<number>>(new Set())

    const markUserAsSeen = (userId: number) => {
        setSeenUsers((prev) => new Set(prev).add(userId))
    }

    return { seenUsers, markUserAsSeen }

}
