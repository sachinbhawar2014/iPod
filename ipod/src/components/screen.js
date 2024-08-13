import React from "react";
import screenCss from "./css/screen.module.css";

import Navbar from "./navbar";
import LockScreen from "./lockscreen";

// component imports
import Albums from "./albums";
import Artists from "./artists";
import Coverflow from "./coverflow";
import Games from "./games";
import Settings from "./settings";
import Home from "./home";
import Music from "./music";
import NowPlaying from "./nowplaying";
import AllSongs from "./allsongs";
import NavbarSettings from "./navbarsettings";
import DisplaySettings from "./displaysettings";
import PlayerSettings from "./playersettings";
import Themes from "./themes";

class Screen extends React.Component {
    constructor() {
        super();
        this.state = {
            time: this.getTime(),
        };
    }
    getTime = () => {
        let today = new Date();
        let timeNow = today.getHours() + ":" + (today.getMinutes() >= 10 ? today.getMinutes() : "0" + today.getMinutes());
        return timeNow;
    };

    render() {
        let a = this.state;
        let props = this.props;
        // console.log("props recieved in Screen", props);
        return (
            <div
                className={`${screenCss.screen}`}
                style={{
                    backgroundImage: `url(${props.screenBGImage})`,
                }}
            >
                {props.currentMenu === "screenLocked" ? (
                    <LockScreen time={a.time} data={props} />
                ) : (
                    <>
                        <Navbar time={a.time} data={props} />

                        <div className={`${screenCss.viewContainer}`}>
                            {(() => {
                                switch (props.currentMenu) {
                                    case "Albums":
                                        return <Albums data={props} />;
                                    case "AllSongs":
                                        return <AllSongs data={props} />;
                                    case "Artists":
                                        return <Artists data={props} />;
                                    case "Coverflow":
                                        return <Coverflow data={props} />;
                                    case "Games":
                                        return <Games data={props} />;
                                    case "Settings":
                                        return <Settings data={props} />;
                                    case "Home":
                                        return <Home data={props} />;
                                    case "Music":
                                        return <Music data={props} />;
                                    case "NowPlaying":
                                        return <NowPlaying data={props} />;
                                    case "NavbarSettings":
                                        return <NavbarSettings data={props} />;
                                    case "DisplaySettings":
                                        return <DisplaySettings data={props} />;
                                    case "PlayerSettings":
                                        return <PlayerSettings data={props} />;
                                    case "Themes":
                                        return <Themes data={props} />;
                                    default:
                                        return <Home data={props} />;
                                }
                            })()}
                        </div>
                    </>
                )}
            </div>
        );
    }
}

export default Screen;
