import React, {Component} from 'react';
import './css/main.css';
import Frames from './Frame';
import Bg from './img/bg.jpg';
import BgMain from './img/bgMain.jpg';
import Icon from './img/logo2.png';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disp: 'none'
		}
	}

	frameOn() {
		this.setState({
			disp:'block',
		})
	}

	render() {	
		var contentStyle = {
		 	display: this.state.disp,
	    	backgroundImage: `url(${BgMain})`,
	    	backgroundSize:'cover',
		};

		const style = {	
			backgroundImage: `url(${Bg})`,
			width:'100%',
			height:'100%',
			backgroundSize:'cover',
	    }

	    const wid = {
	    	width: 'inherit',
	    	height: 'inherit'
	    }


		return (
			<div style={wid}>
				<div className="main animated fadeIn"  style={style}>
					<main>
						<div className="cent">
							<img src={Icon} alt="Icon" /><br/>
							<h1>Garbage Overflow</h1>
							<p>keep calm and dispose</p><br /><br /><br />
							<button onClick={() => this.frameOn()}> START EXPLORING </button>
						</div>
					</main>
				</div>
				
				<Frames contentStyle={contentStyle} />
			</div>
		);	
	}
}

export default Header;