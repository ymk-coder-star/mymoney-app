import styles from './Navbar.module.css';

import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}>
					<Link to="/">myMoney</Link>
				</li>

				{!user && (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Sign up</Link>
						</li>
					</>
				)}

				{user && (
					<>
						<p>hello, {user.displayName}</p>
						<li>
							<button className="btn" onClick={logout}>
								Logout
							</button>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
