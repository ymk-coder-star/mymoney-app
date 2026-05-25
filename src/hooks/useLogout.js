import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from './useAuthContext';
import { projectAuth } from '../firebase/config';

export const useLogout = () => {
	const isCancelled = useRef(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const { dispatch } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);

		try {
			await projectAuth.signOut();

			dispatch({ type: 'LOGOUT' });

			if (!isCancelled.current) {
				setError(null);
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled.current) {
				console.log(err.message);
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => (isCancelled.current = true);
	}, []);

	return { logout, error, isPending };
};
