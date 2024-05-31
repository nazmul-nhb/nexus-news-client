import PropTypes from 'prop-types';
import { useState } from 'react';

const Button = (props) => {
    const [hovered, setHovered] = useState(false);
    const { buttonType, className, buttonText, color, hoverColor, hoverBgColor, onClick, icon } = props;

    const buttonStyles = {
        borderColor: color,
        backgroundColor: hovered ? hoverBgColor : color,
        color: hovered ? color : hoverColor,
        transitionDuration: '500ms',
        transition: 'all 0.3s ease-in-out'
    }
    
    return (
        <button onClick={onClick} type={buttonType} className={className} style={buttonStyles} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>{icon}{buttonText}</button>
    );
};

Button.propTypes = {
    buttonText: PropTypes.string,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    hoverBgColor: PropTypes.string,
    className: PropTypes.string,
    buttonType: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
    onClick: PropTypes.func
}

export default Button;
