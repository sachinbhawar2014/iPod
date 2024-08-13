function Artists(props) {
    let headingStyle = {
        height: "35px",
        padding: "0 30px",
        display: "flex",
        alignItems: "center",
        paddingLeft: "70px",
        boxSizing: "border-box",
        borderRadius: "10px",
        width: "100%",
        fontWeight: "bolder",

        color: `${props.data.headingColor}`,
        backgroundColor: `${props.data.headingBGColor}`,
    };

    let tableContainer = {
        width: "80%",
        height: "185px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontWeight: "bold",
        borderRadius: "5px",
        overflowY: "auto",
        overflowX: "hidden",
    };

    return (
        <>
            <div style={headingStyle}>
                <i className="fa-brands fa-napster"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Artists
            </div>
            <div style={tableContainer}>
                <img src={props.data.artistsImage} style={{ width: "100%", height: "100%", backgroundPosition: "center" }} alt={props.data.currentMenu}></img>
            </div>
        </>
    );
}

export default Artists;
