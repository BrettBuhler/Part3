import React from "react"
const isErrFunction = (x) => {
    if (!x) {
        return (
            {
                color: 'green',
                fontStyle: 'italic',
                backgroundColor: 'grey',
                borderColor: 'green',
                fontSize: 30,
                border: 'solid',
                borderRadius: 5,
                paddingLeft: 20
            }
        )
    }
    return ({
        color: 'red',
        fontStyle: 'italic',
        backgroundColor: 'grey',
        borderColor: 'red',
        fontSize: 30,
        border: 'solid',
        borderRadius: 5,
        paddingLeft: 20
    })
}

const Message = ({message, isError}) => {
    if (message !== null) {
        return (
            <div style={isErrFunction(isError)}>
                {message}
            </div>
        )
    }
}

export default Message