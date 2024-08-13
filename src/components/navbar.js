import React from "react";
import screeCss from "./css/screen.module.css";

const Navbar = (props) => {
    let time1 = props.time;
    let data = props.data;
    return (
        <>
            <div className={`${screeCss.navbar}`} style={{ color: data.navbarTextColor }}>
                <div className={`${screeCss.logoName}`}>iPOD</div>
                <div className={`${screeCss.logoName}`}>{time1}</div>
                <div className={`${screeCss.logoName}`}>
                    <i className="fa-solid fa-battery-three-quarters"></i>
                </div>
            </div>
        </>
    );
};

export default Navbar;
