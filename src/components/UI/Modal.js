import { Fragment } from 'react';
import classes from './Modal.module.css';
import { createPortal } from 'react-dom';

const Backdrop = (props) => {
    return <div onClick={props.onClick} className={classes.backdrop}></div>
}

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portalPosition = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <Fragment>
            {createPortal(<Backdrop onClick={props.backDrop} />, portalPosition)}
            {createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalPosition)}
        </Fragment>
    )
}
export default Modal;