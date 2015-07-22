var React = require('react');
var _ = require('lodash');

let userSelect = (type) => {
    return {
        '-webkit-user-select': type,
        '-khtml-user-drag': type,
        '-khtml-user-select': type,
        '-moz-user-select': type,
        '-ms-user-select': type,
        userSelect: type
    };
};

export class CollapsibleSection extends React.Component  {
	constructor(props) {
    super(props);
    this.state = {title: props.title, open : props.open};
    this.toggle = () => {
  		this.setState({open : !this.state.open})
  	}
  }
	// toggle = () => {
	// 	this.setState({open : !this.state.open})
	// }
  render() {
		let padding = '1rem';
		let wrapperStyle = {
			maxHeight : this.state.open ? '40rem' : '4rem',
			transition: 'max-height 0.5s ease-out',
			translatez : 0,
			margin : '1rem',
			overflow : 'hidden',
			border : 'solid 2px',
			borderRadius : '5px'
		};
		let headerStyle = {
			margin : '0',
			height : '2rem',
			padding : padding,
			backgroundColor : 'lightgray',
			cursor : 'pointer',
			userSelect : 'none'
		};
		let sectionStyle = {
			margin : '0',
			padding : padding,
		}
    return (
      <div style={wrapperStyle} onClick={this.toggle}>
        <h2 style={_.assign(headerStyle, userSelect('none'))}>{this.state.title}</h2>
				<section style={sectionStyle}>{this.props.children}</section>
      </div>
    );
  }
}

CollapsibleSection.propTypes = {
	title: React.PropTypes.string,
	open: React.PropTypes.boolean
};
CollapsibleSection.defaultProps = { title: 'Enter title here', open : true };
