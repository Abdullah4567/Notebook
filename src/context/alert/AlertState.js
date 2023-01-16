import React, { useState } from 'react'
import AlertContext from './AlertContext'

const AlertState = (props) => {
    const icons = {
        danger: <i className="fa-regular fa-circle-xmark text-danger" ></i>,
        success: <i className="fa-regular fa-circle-check text-success"></i>
    }
    const [alert, setalert] = useState({
        show: false,
        message: "",
        delay: 1500,
        icons: null,
        type: null
    })
    const showAlert = (message, type) => {
        setalert({
            show: true,
            message: message,
            delay: 1500,
            icon: icons[type],
            type: type
        });
    }
    const dismissAlert = () => {
        setalert({
            show: false,
            message: "",
            delay: 1500,
            icons: null,
            type: null
        });
    }
    return (
        <AlertContext.Provider value={{ alert, showAlert, dismissAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
