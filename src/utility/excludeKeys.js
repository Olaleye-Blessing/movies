/* eslint-disable default-case */

// keys to exclude when a user inputs data

const excludeKeys = (e) => {
    switch (e.key) {
        case "Control":
        case "Shift":
        case "Alt":
        case "CapsLock":
        case "Enter":
        case "Backspace":
        case "PageDown":
        case "PageUp":
        case "ArrowRight":
        case "ArrowLeft":
        case "ArrowUp":
        case "ArrowDown":
            return true;
    }
};

export default excludeKeys;
