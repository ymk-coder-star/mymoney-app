import { useState, useEffect, useRef } from 'react';
import { useAuthContext } from './useAuthContext';
import { projectAuth } from '../firebase/config';

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);
	const isCancelled = useRef(false);
	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setIsPending(true);
		isCancelled.current = false;
		try {
			const res = await projectAuth.signInWithEmailAndPassword(email, password);

			dispatch({ type: 'LOGIN', payload: res.user });

			if (!isCancelled.current) {
				setError(null);
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled.current) {
				try {
					const parsed = JSON.parse(err.message);
					err = parsed.error;
					console.log(err);
				} catch {
					console.log(err);
				}
				setError(err.message);
				setIsPending(false);
			}
		}
	};

	useEffect(() => {
		return () => {
			isCancelled.current = true;
		};
	}, []);

	return { login, error, isPending };
};
