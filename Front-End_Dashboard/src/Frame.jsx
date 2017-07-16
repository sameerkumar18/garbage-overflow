import React, {Component} from 'react';
import Sam from './img/sam.jpg';
import Report from './Report';
import './css/Frame.css';
import $ from 'jquery';

class Frames extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disp: 'none',
			date: [],
			spin: 'none',
			GO: 'NO',
			button: 'refresh',
			moistureName: '',
			moisture: '',
			temp: '',
			tempName: ''
		}
	}

	report() {
		console.log('hi');
		$('.report').slideDown();
		this.setState({ disp:'block' });
		var lol=[];
		var temp;
		return $.getJSON('http://10.0.1.71:9080/report')
      		.then((data) => {
        	
        	var counter = 0;
        	console.log(data);
        	$.each(data, function(i, item) {
	    		$.each(item, function(i, items) {
	    			$.each(items, function(i, itemss) {
	    				console.log(itemss[7]);
	    			temp = new Date(itemss[7]).toString().replace("GMT+0530 (IST)", "");
	    				console.log(temp);

	    			lol[counter] = temp.replace("GMT+0530 (India Standard Time)", "");
	    				console.log(lol[counter]);

	    			counter++;
				});
			});
      	});
		this.setState({ date:lol});
	})
  }


  ref(val) {
  	if(val === 'refresh') {
	  	this.setState({spin: 'block', button:'tracking'});
	  	return $.getJSON('http://10.0.1.71:9080/status/alpha')
			      		.then((data) => {
			      	if(data.data.length === 1) {
				      	console.log(data);
				      	setTimeout(() => {this.setState({spin: 'none', button:'Dispose It', GO: ' 01.', moisture: data.data[0][0][2]+'%', moistureName: 'Moisture Level', temp: data.data[0][0][3]+'°C', tempName: 'Temp Level'})}, 5000)
			    }
			    else{
			    	setTimeout(() => {this.setState({spin: 'none', button:'refresh', GO: 'NO', moisture: '', moistureName: '', temp: '', tempName: ''})}, 2000)
			    }
		}); 	

	 }
	 else if(val === 'Dispose It') {
	 	this.setState({spin: 'block', button:'wait disposing'});
	 	return $.getJSON('http://10.0.1.71:9080/update')
		      		.then((data) => {
		      	if(data.response === 200) {
			      	console.log(data.response);
			      	setTimeout(() => {this.setState({spin: 'none', button:'refresh', GO: 'NO', moisture: '', moistureName: '', temp: '', tempName: ''})}, 3000)
			    }
			    else {
			    	setTimeout(() => {this.setState({spin: 'none', button:'Dispose It', GO: '01.'})}, 2000)
			    }
		});
	 }
  }

	render() {
		const wid = {
	   		width: 'inherit',
	 		height: 'inherit'
		}

		var reportStyle = {
		 	display: this.state.disp,
		}	

		var display = {
		 	display: this.state.spin,
		}	
		return (	
			<div style={wid}>
				<div className="frame animated slideInRight" id="lol" style={this.props.contentStyle}>

					<nav>
						<div className="nav-center">
							<div className="wrap">
								<i onClick={()=> this.report()} className="pe-7s-note2 pe-2x"></i>
							</div>

							<div className="wrap">
								<h1>TRACKING</h1>
							</div>

							<div className="wrap">
								<img src={Sam} />
							</div>
						</div>
					</nav>

					<div id="loler" style={display} className={this.state.spin}>
						<div className='spinner'> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> <i> <b></b> </i> </div>
					</div>
					<h1 className="what">{this.state.GO}</h1>

					<div className="moisture">
						<h1>{this.state.moisture}</h1>
						<p>{this.state.moistureName}</p>
					</div>

					<div className="temp">
						<h1>{this.state.temp}</h1>
						<p>{this.state.tempName}</p>
					</div>

					<p className="namo">GARBAGE OVERFLOW!</p>
					<span className="gta">Near your area</span>
					<button className="refresh" onClick={()=> this.ref(this.state.button)}>{this.state.button}</button>
				</div>
				<Report reportStyle={reportStyle} date={this.state.date} />
			</div>
		)
	}
}

export default Frames;