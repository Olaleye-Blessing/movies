class MyError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class NotFound extends MyError {}

class NetWork extends MyError {}

export { NotFound, NetWork };
