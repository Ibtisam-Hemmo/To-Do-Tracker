import propTypes from 'prop-types';

const Button = ({color , name, onClick}) => {
    return <button style ={{ backgroundColor :color}} className = "btn" onClick = {onClick}> 
                {name} 
            </button>
}

Button.defaultProps ={ 
    color : "steelblue",
}

Button.propTypes = {
    color : propTypes.string,
    name : propTypes.string,
    onClick : propTypes.func,
}
export default Button;
