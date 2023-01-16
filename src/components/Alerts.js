import React, { useContext } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import AlertContext from '../context/alert/AlertContext';

function Alert() {
    const { alert, dismissAlert } = useContext(AlertContext)
    return (
        <>
            <ToastContainer className="p-3" position='bottom-end'>
                <Toast show={alert.show} bg={alert.type} onClose={dismissAlert} delay={alert.delay} autohide>
                    <Toast.Header closeButton={true} >
                        <div className='me-auto fs-5'>
                            {alert.icon}
                        </div>
                    </Toast.Header>
                    <Toast.Body>{alert.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
}

export default Alert;