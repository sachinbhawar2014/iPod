import React, { useRef, useEffect } from "react";

function NavbarSettings(props) {
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

    let tableRow = {
        width: "250px",
        height: "25px",
        fontSize: "smaller",
        fontWeight: "bold",
        borderRadius: "5px",
        paddingLeft: "30px",

        color: `${props.data.menuTextColor}`,
        backgroundColor: `${props.data.menuBGColor}`,
    };

    let tableRowSelected = {
        width: "250px",
        height: "25px",
        fontSize: "medium",
        fontWeight: "bold",
        paddingLeft: "30px",
        borderRadius: "10px",
        color: `${props.data.selectedMenuTextColor}`,
        backgroundColor: `${props.data.selectedMenuBGColor}`,
    };

    let sI = props.data.selectedItemIndex;
    const list = props.data.list;
    const lastRowRef = useRef(null);
    const scrollToLastRow = () => {
        lastRowRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    useEffect(() => {
        if (!lastRowRef.current) {
            return;
        }
        scrollToLastRow();
    }, [props.data.selectedItemIndex]);

    return (
        <>
            <div style={headingStyle}>
                <i className="fa-solid fa-bars-progress"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Navbar Settings
            </div>
            <div style={tableContainer}>
                <table>
                    <tbody>
                        {list
                            ? list.map((ele, i) => (
                                  <tr key={i}>
                                      {sI === i ? (
                                          <td style={tableRowSelected}>
                                              <i className={ele.class}></i>&nbsp;&nbsp;&nbsp;{ele.name}
                                          </td>
                                      ) : (
                                          <td style={tableRow}>
                                              <i className={ele.class}></i>&nbsp;&nbsp;&nbsp;{ele.name}
                                          </td>
                                      )}
                                  </tr>
                              ))
                            : null}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default NavbarSettings;
