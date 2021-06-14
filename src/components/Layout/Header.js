import React,{ Fragment } from 'react'

import classes from './Header.module.css'

import Assets from '../Assets/meals.jpg'
import HeaderCardButton from './HeaderCartButton'

const Header = (props) => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h1>React Component</h1>
                <HeaderCardButton onClick={props.onCartShow}/>
            </header>
            <div className={classes['main-image']}>
                <img src={Assets} alt='Meals'/>
            </div>
        </Fragment>
    );

}

export default Header;