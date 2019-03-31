// Message Class
class Message {
    constructor() {

        this.messages = [];

        // Connect to socket Server
        this.socket = io();

        // Handle connection error(
        this.socket.once('connect_error', () => {

            // notify main.js via an Event
            window.dispatchEvent(new Event('messages_error'));
        });

        // Listen for all server messages (sent on connect)
        this.socket.on('all_messages', (messages) => {

            // Update local messages array
            this.messages = messages;

            // Notify client via an event
            window.dispatchEvent(new Event('messages_ready') );
        });

        // Listen for new mssage from Server
        this.socket.on('new_message', (message) => {
            this.messages.unshift(message);

            // notify event via custom Event
            window.dispatchEvent(new CustomEvent('new_message', {detail: message}))
        });

    }

    // Get all Messages
    get all() {
        return this.messages;
    }

    // Add a new messages
    add(data_uri, caption_text) {
        // create messsage object
        let message = {
            photo: data_uri,
            caption: caption_text
        }

        // Add to local Messages
        this.messages.unshift(message);

        // Emit to Server
        this.socket.emit('new_message', message);

        // Return formated message
        return message;
    }
}
