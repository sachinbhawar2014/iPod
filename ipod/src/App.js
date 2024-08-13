import React from "react";
import appCss from "./components/css/App.module.css";
import Controls from "./components/controls";
import Screen from "./components/screen";

// Songs imports
import song1 from "./components/songs/Aaj_Ki_Raat.mp3";
import song2 from "./components/songs/Guli_Mata.mp3";
import song3 from "./components/songs/Tauba_Tauba.mp3";
import song4 from "./components/songs/O_Mahi.mp3";
import song5 from "./components/songs/Ram_Siya_Ram.mp3";
import song6 from "./components/songs/Yimmy_Yimmy.mp3";

// Image imports

import img1 from "./components/images/1.jpg";
import img2 from "./components/images/2.jpg";
import img3 from "./components/images/3.jpg";
import img4 from "./components/images/4.jpg";
import img5 from "./components/images/5.jpg";
import img6 from "./components/images/6.jpg";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            screenLocked: false,

            currentMenu: "Home",
            menu: {
                screenLocked: ["Home"],
                Home: [
                    { name: "Music", class: "fa-solid fa-music" },
                    { name: "Settings", class: "fa-solid fa-gear" },
                    { name: "Games", class: "fa-solid fa-gamepad" },
                    { name: "Coverflow", class: "fa-brands fa-pix" },
                ],
                Music: [
                    { name: "NowPlaying", class: "fa-solid fa-play" },
                    { name: "AllSongs", class: "fa-solid fa-list-ul" },
                    { name: "Artists", class: "fa-brands fa-napster" },
                    { name: "Albums", class: "fa-solid fa-guitar" },
                ],
                Settings: [
                    { name: "NavbarSettings", class: "fa-solid fa-bars-progress" },
                    { name: "DisplaySettings", class: "fa-solid fa-tv" },
                    { name: "PlayerSettings", class: "fa-solid fa-radio" },
                    { name: "Themes", class: "fa-solid fa-palette" },
                ],
                Games: [],
                Coverflow: [],
                AllSongs: [], // will be filled by setState
                NavbarSettings: [
                    { name: "NavbarColor", class: "" },
                    { name: "NavbarBackgroundColor", class: "" },
                ],
                DisplaySettings: [
                    { name: "Heading", class: "" },
                    { name: "Heading Background", class: "" },
                    { name: "Menu", class: "" },
                    { name: "Menu Background", class: "" },
                    { name: "Selected Menu", class: "" },
                    { name: "Selected Menu Background", class: "" },
                ],
                PlayerSettings: [{ name: "Player Background", class: "" }],
                // Themes: [{ name: "ColorThemes", class: "" }],
            },
            route: [],
            // music realated states
            songs: [
                {
                    name: "Aaj_Ki_Raat",
                    imageFile: img1,
                    imgUrl: "/images/1.jpg",
                    mp3File: song1,
                    mp3Url: "/songs/Aaj_Ki_Raat.mp3",
                },
                {
                    name: "Guli_Mata",
                    imageFile: img2,
                    imgUrl: "/images/2.jpg",
                    mp3File: song2,
                    mp3Url: "/songs/Guli_Mata.mp3",
                },
                {
                    name: "Tauba_Tauba",
                    imageFile: img3,
                    imgUrl: "/images/3.jpg",
                    mp3File: song3,
                    mp3Url: "/songs/Tauba_Tauba.mp3",
                },
                {
                    name: "O_Mahi",
                    imageFile: img4,
                    imgUrl: "/images/4.jpg",
                    mp3File: song4,
                    mp3Url: "/songs/O_Mahi.mp3",
                },
                {
                    name: "Ram_Siya_Ram",
                    imageFile: img5,
                    imgUrl: "/images/5.jpg",
                    mp3File: song5,
                    mp3Url: "/songs/Ram_Siya_Ram.mp3",
                },
                {
                    name: "Yimmi_Yimmi",
                    imageFile: img6,
                    imgUrl: "/images/6.jpg",
                    mp3File: song6,
                    mp3Url: "/songs/Yimmi_Yimmi.mp3",
                },
            ],

            songList: [],
            currentSongIndex: 0,
            isPlaying: false,
            playingProgress: 0,
            volume: 0,

            colors: ["white", "red", "blue", "black", "violet", "aqua", "gold", "grey", "green", "yellow", "yellowgreen", "pink", "red", "brown", "orange", "blueviolet"],

            // styles states
            lockScreenTextColor: "white",
            lockScreenBGColor: "black",
            navbarTextColor: "white",

            headingColor: "violet",
            headingBGColor: "White",

            menuTextColor: "white",
            menuBGColor: "blueviolet",

            selectedMenuTextColor: "brown",
            selectedMenuBGColor: "grey",

            screenBGImage: "./images/coverflow.png",

            selectedItemIndex: null,
            itemSelectionListLength: 0,
            itemSelectionList: [],
            gameImage: "./images/dice-gameslide.jpg",
            CoverflowImage: "./images/coverflow.png",
            artistsImage: "./images/artists.png",
            albumImage: "./images/albums.png",
        };
        this.musicPlayer = new Audio(this.state.songs[this.state.currentSongIndex].mp3File);
        this.timer = null;
    }

    getDuration = () => {
        if (!this.musicPlayer) return;
        let duration = this.musicPlayer.duration;
        let currentTime = this.musicPlayer.currentTime;
        let op = (currentTime * 100) / duration;
        this.setState({ playingProgress: op });
        if (op === 100 && this.state.isPlaying) {
            this.playNextSong();
        }
    };

    playAudio = async () => {
        if (!this.musicPlayer) {
            this.musicPlayer = await new Audio(this.state.songs[this.state.currentSongIndex].mp3File);
        }

        await this.musicPlayer.play();
        this.timer = setInterval(() => {
            let t1 = this.musicPlayer.currentTime / this.musicPlayer.duration;
            let vol = this.musicPlayer.volume;
            this.setState({ playingProgress: t1, volume: vol });
            // console.log("playing Progress:", this.state.playingProgress);
        }, 2000);
        await this.setState({ isPlaying: true });
        return;
    };

    pauseAudio = async () => {
        clearInterval(this.timer);
        await this.musicPlayer.pause();
        await this.setState({ isPlaying: false });
    };

    increaseVolume = () => {
        if (this.musicPlayer.volume >= 0.95) return;
        this.musicPlayer.volume = this.musicPlayer.volume + 0.05;
        return;
    };
    decreaseVolume = () => {
        if (this.musicPlayer.volume <= 0.05) return;
        this.musicPlayer.volume = this.musicPlayer.volume - 0.05;
        return;
    };

    loadSong = async (songIndex) => {
        await this.setState({ currentSongIndex: songIndex });
        if (this.musicPlayer) {
            await this.pauseAudio();
        }
        this.musicPlayer = null;
        this.musicPlayer = await new Audio(this.state.songs[songIndex].mp3File);
        await this.playAudio();
    };

    playNextSong = async () => {
        if (this.musicPlayer) this.musicPlayer.pause();
        this.musicPlayer = null;

        let nextIndex = (this.state.currentSongIndex + 1) % this.state.songs.length;
        this.setState({ currentSongIndex: nextIndex, isPlaying: true });

        this.musicPlayer = new Audio(this.state.songs[nextIndex].mp3File);
        await this.playAudio();
    };

    playPrevSong = async () => {
        if (this.musicPlayer) this.musicPlayer.pause();
        this.musicPlayer = null;

        let nextIndex = this.state.currentSongIndex === 0 ? this.state.songs.length - 1 : this.state.currentSongIndex - 1;

        this.setState({ currentSongIndex: nextIndex, isPlaying: true });

        this.musicPlayer = await new Audio(this.state.songs[nextIndex].mp3File);
        await this.playAudio();
    };

    fastForward = () => {
        let currentTime = this.musicPlayer.currentTime;
        let duration = this.musicPlayer.duration;
        if (duration > currentTime + 10) {
            this.musicPlayer.currentTime = currentTime + 10;
        }
        this.playAudio();
        return;
    };

    fastReverse = () => {
        let currentTime = this.musicPlayer.currentTime;
        if (currentTime < 20) {
            this.musicPlayer.currentTime = 0;
        } else {
            this.musicPlayer.currentTime = currentTime - 20;
        }
        this.playAudio();
        return;
    };

    handleMenuBtnClick = async () => {
        this.initialise();

        await this.setState((prevState) => ({ ...prevState, currentMenu: "Home", selectedItemIndex: null, screenLocked: false }));
        console.log(this.state);
        return;
    };

    handleBackwordBtnClick = () => {
        if (this.state.screenLocked) return;
        let vm = this.state.currentMenu;
        if (vm === "Home" || vm === "Music" || vm === "Settings" || vm === "AllSongs" || vm === "NavbarSettings" || vm === "DisplaySettings" || vm === "PlayerSettings" || vm === "Themes") {
            this.navigateNextMenu(vm, -1);
            return;
        }

        if (this.state.currentMenu === "NowPlaying") {
            this.fastReverse();
            return;
        }
    };

    handleDownwordBtnClick = async () => {
        let a = this.state;
        let menu = a.currentMenu;

        if (!a.screenLocked && (menu === "Music" || menu === "Settings" || menu === "Games" || menu === "Coverflow")) {
            this.setState((prevState) => ({ ...prevState, currentMenu: "Home" }));
            return;
        }
        if (!a.screenLocked && (menu === "AllSongs" || menu === "Artists" || menu === "Albums")) {
            this.setState((prevState) => ({ ...prevState, currentMenu: "Music" }));
            return;
        }
        if (!a.screenLocked && (menu === "NavbarSettings" || menu === "DisplaySettings" || menu === "PlayerSettings" || menu === "Themes")) {
            this.setState((prevState) => ({ ...prevState, currentMenu: "Settings" }));
            return;
        }
        if (!a.screenLocked && (menu === "NavbarColor" || menu === "NavbarBackgroundColor")) {
            this.setState((prevState) => ({ ...prevState, currentMenu: "NavbarSettings" }));
            return;
        }
        if (
            !a.screenLocked &&
            (menu === "Heading" || menu === "Heading Background" || menu === "Menu" || menu === "Menu Background" || menu === "Selected Menu" || menu === "Selected Menu Background")
        ) {
            this.setState((prevState) => ({ ...prevState, currentMenu: "DisplaySettings" }));
            return;
        }
        if (!a.screenLocked && menu === "Player Background") {
            this.stasetState((prevState) => ({ ...prevState, currentMenu: "PlayerSettings" }));
            return;
        }
        if (!a.screenLocked && menu === "ColorThemes") {
            this.setState((prevState) => ({ ...prevState, currentMenu: "Themes" }));
            return;
        }

        if (this.state.isPlaying === false) {
            this.playAudio();
            return;
        } else {
            this.pauseAudio();
        }
    };

    handleForwordBtnClick = () => {
        if (this.state.screenLocked) return;
        let vm = this.state.currentMenu;
        if (vm === "Home" || vm === "Music" || vm === "Settings" || vm === "AllSongs" || vm === "NavbarSettings" || vm === "DisplaySettings" || vm === "PlayerSettings" || vm === "Themes") {
            this.navigateNextMenu(vm, 1);
            return;
        }
        if (this.state.currentMenu === "NowPlaying") {
            this.fastForward();
            return;
        }
    };

    initialise = async () => {
        let songList = this.state.songs.map((song, index) => ({
            id: index,
            name: song.name,
            mp3Url: song.mp3Url,
            imgUrl: song.imgUrl,
        }));
        let songList2 = this.state.songs.map((song) => ({ name: song.name, class: "fa-solid fa-music" }));
        await this.setState((prevState) => ({
            ...prevState,
            screenLocked: !prevState.screenLocked,
            currentMenu: "Home",
            songList: songList,
            menu: { ...prevState.menu, AllSongs: songList2 },
        }));

        return;
    };

    handleOkBtnClick = async () => {
        let a = this.state;
        let b = a.currentMenu;
        if (this.state.songList.length === 0) {
            this.initialise();
        }
        if (this.state.screenLocked || a.selectedItemIndex === null) return;
        if (b === "Themes" || b === "PlayerSettings" || b === "DisplaySettings" || b === "NavbarSettings") return;
        if (a.currentMenu === "AllSongs") {
            this.loadSong(a.selectedItemIndex);
            return;
        }
        let menuToNavigate = a.menu[a.currentMenu][a.selectedItemIndex].name;

        if (menuToNavigate) {
            this.setState((prevState) => ({ ...prevState, currentMenu: menuToNavigate, selectedItemIndex: null }));
            return;
        }
    };

    // Double Click

    handleOkBtnDoubleClick = async () => {
        if (!this.state.screenLocked) {
            await this.setState((prevState) => ({
                ...prevState,
                screenLocked: !prevState.screenLocked,
                currentMenu: "Home",
            }));

            return;
        }
        this.setState((prevState) => ({
            ...prevState,
            screenLocked: !prevState.screenLocked,
            currentMenu: "screenLocked",
            selectedItemIndex: null,
        }));
        console.log("current Menu:", this.state.currentMenu);
        return;
    };
    handleBackwordBtnDoubleClick = () => {
        if (this.state.screenLocked) return;
        if (this.state.currentMenu === "NowPlaying") {
            this.playPrevSong();
            return;
        }
    };

    handleForwordBtnDoubleClick = () => {
        if (this.state.screenLocked) return;
        if (this.state.currentMenu === "NowPlaying") {
            this.playNextSong();
            return;
        }
    };

    navigateNextMenu = async (vm, inc) => {
        let listLength = this.state.menu[vm].length;
        let index = this.state.selectedItemIndex;
        console.log(this.state);
        if (index === null) {
            index = 0;
            await this.setState((prevState) => ({
                ...prevState,
                selectedItemIndex: index,
                itemSelectionListLength: listLength,
            }));
        } else {
            index = inc > 0 ? (index + inc) % listLength : (index - 1 + listLength) % listLength;
            await this.setState((prevState) => ({
                ...prevState,
                selectedItemIndex: index,
                itemSelectionListLength: listLength,
            }));
        }
    };

    handleRotation = (rotations) => {
        if (this.state.screenLocked) return;
        let vm = this.state.currentMenu;
        if (vm === "Home" || vm === "Music" || vm === "Settings" || vm === "AllSongs" || vm === "NavbarSettings" || vm === "DisplaySettings" || vm === "PlayerSettings" || vm === "Themes") {
            this.navigateNextMenu(vm, rotations);
            return;
        }

        if (vm === "NowPlaying") {
            if (rotations === 1) {
                this.increaseVolume();
            } else if (rotations === -1) {
                this.decreaseVolume();
            }
            return;
        }
    };

    render() {
        let a = this.state;
        let list = a.menu[a.currentMenu];

        return (
            <div className={appCss.iPod}>
                {/* Assuming Screen component usage */}
                <Screen
                    screenLocked={a.screenLocked}
                    currentMenu={a.currentMenu}
                    routing={a.routing}
                    route={a.route}
                    songList={a.songList}
                    currentSongIndex={a.currentSongIndex}
                    isPlaying={a.isPlaying}
                    playingProgress={a.playingProgress}
                    volume={a.volume}
                    lockScreenTextColor={a.lockScreenTextColor}
                    lockScreenBGColor={a.lockScreenBGColor}
                    navbarTextColor={a.navbarTextColor}
                    headingColor={a.headingColor}
                    headingBGColor={a.headingBGColor}
                    menuTextColor={a.menuTextColor}
                    menuBGColor={a.menuBGColor}
                    selectedMenuTextColor={a.selectedMenuTextColor}
                    selectedMenuBGColor={a.selectedMenuBGColor}
                    screenBGImage={a.screenBGImage}
                    selectedItemIndex={a.selectedItemIndex}
                    gameImage={a.gameImage}
                    CoverflowImage={a.CoverflowImage}
                    artistsImage={a.artistsImage}
                    albumImage={a.albumImage}
                    list={list}
                />
                <Controls
                    MenuBtnClick={this.handleMenuBtnClick}
                    backwordBtnClick={this.handleBackwordBtnClick}
                    downwordBtnClick={this.handleDownwordBtnClick}
                    forwordBtnClick={this.handleForwordBtnClick}
                    okBtnClick={this.handleOkBtnClick}
                    okBtnDoubleClick={this.handleOkBtnDoubleClick}
                    forwordBtnDoubleClick={this.handleForwordBtnDoubleClick}
                    backwordBtnDoubleClick={this.handleBackwordBtnDoubleClick}
                    rotation={this.handleRotation}
                />
            </div>
        );
    }
}

export default App;
