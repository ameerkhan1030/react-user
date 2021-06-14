import classes from "./Modal.module.css";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
const Modal = props => {

  const BackDrop = () => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>;
  } 

  const ModalOverlay = () => {
     return  (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )};
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, document.getElementById("overlays"))}
      {ReactDOM.createPortal(
        <ModalOverlay ></ModalOverlay>,
        document.getElementById("overlays")
      )}
    </Fragment>
  );
};

export default Modal;
