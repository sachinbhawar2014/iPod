const LockScreen = (props) => {
    const lsStyle = {
        color: props.data.lockScreenTextColor,
        backgroundColor: props.data.lockScreenBGColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "medium",
        fontWeight: "bolder",
        height: "100%",
        width: "100%",
        zIndex: 3,
    };

    let time2 = props.time;

    return (
        <div style={lsStyle}>
            <h3>{time2}</h3>
            <h4>Press Menu Button to Unlock !!</h4>
        </div>
    );
};

export default LockScreen;
