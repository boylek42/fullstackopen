const Notification = ({message, type}) => {
    const errorStyle = {
        color: "red",
        backgroundColor: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5, 
        padding: 10,
        marginBottom: 10,
    }

    const successStyle = {
        color: "green",
        backgroundColor: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5, 
        padding: 10,
        marginBottom: 10,
    }

    if(message === null) {
        return null
    }

    if (type === 'error') {
        return (
            <div style={errorStyle}>
                <p>{message}</p>
            </div>
        )  
    }

    return (
        <div style={successStyle}>
            <p>{message}</p>
        </div>
    )  
    
}

export default Notification