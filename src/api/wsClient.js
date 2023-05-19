let ws = null;

export function initConnection(setTasks) {
    ws = new WebSocket('ws://127.0.0.1:8000');
    ws.onopen = (event) => {
        console.log('WebSocket connection established.');
    };

    ws.onmessage = function (event) {
        const json = JSON.parse(event.data);
        try {
            if ((json.event = "data")) {
                setTasks(json);
                console.log(json.data);
            }
        } catch (err) {
            console.log(err);
        }
    }
};

export function sendMessage(message) {
    console.log('sending message', message);
    if (ws) {
        ws.send(message);
    }
}