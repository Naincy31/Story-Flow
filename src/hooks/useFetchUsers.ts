import {useState, useEffect} from 'react';
import {UserStory} from '../types';

export const useFetchUsers = () => {
    const [users, setUsers] = useState<UserStory[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/data/users.json')
            const data: UserStory[] = await response.json()
            setUsers(data)
        }

        fetchUsers()
    }, [])

    return users;
}