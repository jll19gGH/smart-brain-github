import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

function Logo() {
	return (
			<div style={{display: 'flex', justifyContent: 'center'}} className='ma4 mt0'>
				<Tilt className='br2'>
			    	<div style={{ height: '200px', width: '200px'}}>
			        	<div className='pa3'>
			        		<img style={{paddingTop: '30px'}} src={brain} alt='logo'/>
			        	</div>
			    	</div>
	    		</Tilt>
    		</div>
		);
}

export default Logo;