import classes from './Card.module.css'

const Card = props => {

    const className = props.className ? props.className : classes.card;
    return (
        <div className={className}>{props.children}</div>
    );
}

export default Card;