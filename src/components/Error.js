import React from 'react'

const Error = () => {
    const style = {
        fontSize: "90px",
        marginTop: "50px",
    }
    return (
        <>
            <div className="container p-3">
                <p className="text-center text-danger text-sm" style={style}>
                    Page Error 404!</p>
            </div>
        </>
    )
}

export default Error
