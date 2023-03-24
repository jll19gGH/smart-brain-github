import React from 'react';

function Navigation({onRouteChange}) {
	return (
			<div>
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p
						onClick={() => onRouteChange('signout')}
						className='f3 link dim black underline pa3 pointer'>
						Sign out
					</p>
				</nav>
			</div>
		);
}

export default Navigation;