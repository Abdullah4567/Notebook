import React from 'react'

const Error = () => {
    const style = {
        fontSize: "55px",
        marginTop: "50px",
    }
    return (
        <>
            <div className="container p-3">
                <p className="text-center text-danger " style={style}>
                    Page Error 404!</p>
            </div>
        </>
    )
}

export default Error
