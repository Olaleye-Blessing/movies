//? check if the user is 100px away from reach the document's bottom
const checkScroll = () => {
    let windowRelativeBottom =
        document.documentElement.getBoundingClientRect().bottom;
    let visibleHeight = document.documentElement.clientHeight;

    return windowRelativeBottom - visibleHeight < 100;
};

export { checkScroll };
