// import propTypes from 'prop-types';
import Button from './Button';
import {useLocation} from 'react-router-dom';
// import Tasks from './Tasks';

const Header = ({name, onAdd, showAdd}) => {

    const location = useLocation();
    return (
        <header className = "header">
            <h1 > {name} </h1>
            {location.pathname === '/' && 
            <Button color ={showAdd ? 'red' : 'green'} name="Add" onClick = {onAdd} name = { showAdd ? "Close" : "Add" }/>
            // {/* <Tasks /> */}
            }
        </header>
    )
}

// Header.defaultProps = {
//     name : "Task Tracker",
// }



// Header.propTypes = {
//     name : propTypes.string.isRequired,
// }

/*Styling in react can be done with inline-style with double 
curly brackets or defining a var with its style in it*/
// const headingStyle = {
//     color: "pink" ,
//     backgroundColor: "blue"
// }
export default Header;
