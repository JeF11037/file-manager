const error_input = '\nInvalid input\n\n';
const error_operation = '\nOperation failed\n\n';

const getGreetMessage = (username) => {
    return `\n\nWelcome to the File Manager, ${ username }!\n`;
}

const getFarewellMessage = (username) => {
    return `\n\nThank you for using File Manager, ${ username }, goodbye!\n`;
}

const getCurrentDirectoryMessage = (path) => {
    return `\nYou are currently in ${ path }\n\n`;
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

const displayMessage = async (message) => {
    for (let char of message.split(''))
    {
        process.stdout.write(char);
        await sleep(10);
    }
}

const displayMessages = async (messages) => {
    for (let message of messages)
    {
        await displayMessage(message);
    }
}

export { 
    error_input,
    error_operation,
    getGreetMessage,
    getFarewellMessage,
    getCurrentDirectoryMessage,
    displayMessage,
    displayMessages
}