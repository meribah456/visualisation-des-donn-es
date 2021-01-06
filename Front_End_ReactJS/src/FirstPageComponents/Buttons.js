import React from 'react';
import { Link } from 'react-router-dom';
const Buttons = () => {
        return (
            <React.Fragment>
               <Link to="/visualization" className="btn btn-info">Visualize you data</Link>
            </React.Fragment>
        );
};
export default Buttons;