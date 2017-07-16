import React, {Component} from 'react';
import './css/Report.css';
import Sam from './img/sam.jpg';
import $ from 'jquery';


class Report extends Component {
	constructor(props) {
		super(props);
		this.state={
			chang: {}
		}
		
	}


// 	var date = new Date('2017-07-16 03:47:10.52'); 
// alert(date.toString().replace("GMT+0530 (India Standard Time)", ""));

	closeUp() {
		$('.report').slideUp(); 
	}



	render() {
		const wholeSet = this.props.date.map((item, i) => {
      			return <div>
        			<div className="wrap-content">
						<img src={Sam} />
						<p>Pickup By: Ashish Pohwa</p><br />
						<span><i key={i}>{item}</i></span>
					</div>
      			</div>
    		});

		return (
			<div className="report animated slideInTop slideOutTop" style={this.props.reportStyle}>
				<a href="#close" onClick={() => this.closeUp()} className="close"></a>

				<div className="top">
					<h1>Pickup Report</h1>
					{wholeSet}
					
				</div>
			</div>
		)
	}
}

export default Report;