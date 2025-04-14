export default class CommonHelpers {
    static sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));
} 