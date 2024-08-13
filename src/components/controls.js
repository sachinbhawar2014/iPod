import React, { useEffect, useRef } from "react";
import ZingTouch from "zingtouch";

import controlsCss from "./css/controls.module.css";
import leftArrow from "./images/left-arrow.png";
import rightArrow from "./images/right-arrow.png";
import bottomArrow from "./images/arrow-pointing-downwards.png";

function Controls(props) {
    const wheelRef = useRef(null);
    const { rotation, ...data } = props;
    useEffect(() => {
        const wheel = wheelRef.current;
        const rotateRegion = new ZingTouch.Region(wheel);
        let currentAngle = 0;

        rotateRegion.bind(wheel, "rotate", (e) => {
            currentAngle += e.detail.distanceFromLast;
            if (currentAngle > 20) {
                rotation(1);
                currentAngle = 0;
            } else if (currentAngle < -20) {
                rotation(-1);
                currentAngle = 0;
            }
        });

        return () => {
            rotateRegion.unbind(wheel, "rotate");

            currentAngle = 0;
        };
    }, [rotation]);

    const menuClick = () => {
        props.MenuBtnClick && props.MenuBtnClick();
    };

    const backwordClick = () => {
        props.backwordBtnClick && props.backwordBtnClick();
    };
    const downwordClick = () => {
        props.downwordBtnClick && props.downwordBtnClick();
    };
    const forwordClick = () => {
        props.forwordBtnClick && props.forwordBtnClick();
    };

    const okClick = () => {
        props.okBtnClick && props.okBtnClick();
    };

    const okDoubleClick = () => {
        props.okBtnDoubleClick && props.okBtnDoubleClick();
    };
    const forwordDoubleClick = () => {
        props.forwordBtnDoubleClick && props.forwordBtnDoubleClick();
    };
    const backwordDoubleClick = () => {
        props.backwordBtnDoubleClick && props.backwordBtnDoubleClick();
    };

    return (
        <section className={controlsCss.controls}>
            <div className={controlsCss.wheel} ref={wheelRef}>
                <span className={`${controlsCss.buttons} ${controlsCss.menuBtn}`} onClick={menuClick}>
                    Menu
                </span>
                <img onDoubleClick={backwordDoubleClick} onClick={backwordClick} className={`${controlsCss.buttons} ${controlsCss.leftBtn}`} src={leftArrow} alt="left"></img>
                <img onDoubleClick={forwordDoubleClick} onClick={forwordClick} className={`${controlsCss.buttons} ${controlsCss.rightBtn}`} src={rightArrow} alt="right"></img>
                <img onClick={downwordClick} className={`${controlsCss.buttons} ${controlsCss.bottomBtn}`} src={bottomArrow} alt="bottom"></img>
                <div onDoubleClick={okDoubleClick} onClick={okClick} className={`${controlsCss.okBtn}`}>
                    <b>OK</b>
                </div>
            </div>
        </section>
    );
}

export default Controls;
