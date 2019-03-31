// Init new camera instance on the player node
const camera = new Camera(document.getElementById('player'));

// Main app logic
const _init = () => {

    // Init new message insance
    const messages = new Message();

    // Notify user of connection errors
    window.addEventListener('message_error', () => {
        toastr.error('Message could not be retrieved<br>Will keep trying.', 'Network Connection Error')
    });

    // Listen for existing messages from server
    window.addEventListener('messages_ready', (e) => {

        // remove loader
        $('#loader').remove();

        // Check for some messages existing
        if(messages.all.length == 0) toastr.info('Add the First message', 'No Messages');

        // emtpy out existing messages if this update is from a reconnection
        $('#messages').empty();

        // Loop thru and render all messages_ready
        messages.all.reverse().forEach(renderMessage);
    });

    // Listen for new message event
    window.addEventListener('new_message', (e) => {
        renderMessage(e.detail)
    });

    // Switch on the camera as app is launched
    $('#viewfinder').on("show.bs.modal", () => {
        camera.switch_on();
    });

    // Switch off the camera in viewfinder
    $('#viewfinder').on("hidden.bs.modal", () => {
        camera.switch_off();
    });

    // Take Photo
    $('#shutter').on("click", () => {
        let photo = camera.take_photo();
        // show photo preview in camera button
        $('#camera').css('background-image', `url(${photo})`).addClass('withPhoto')
    });

    // Submit messages
    $('#send').on("click", () => {

        // Get caption textarea
        let caption = $('#caption').val();

        // Check mssage is okay
        if(!camera.photo || !caption) {
            toastr.warning("Photo & Caption required", 'Incomplete Message');
            return
        }

        // Add new messages
        let message = messages.add(camera.photo, caption);

        // Render new message in feed
        renderMessage(message);
        console.log(messages.all)

        // Reset caption field on success
        $('#caption').val('');
        $('#camera').css('background-image', '').removeClass('withPhoto')
        camera.photo = null;
    });
}

// Create new message element
const renderMessage = (message) => {

    // Message html
    let msgHTML = `
        <div style="display:none;" class="row message bg-light mb-2 rounded shadow">
            <div class="col-2 p-1">
                <img src="${message.photo}" class="photo w-100" rounded">
            </div>
            <div class="col-10 p-1">${message.caption}</div>
        </div>
    `;

    // Prepend to Messages
    $(msgHTML).prependTo('#messages').show(500)

        // bind a click handler on new image element to show in modal
        .find('img').on("click", showPhoto)
};

// Show message photo in Modal
const showPhoto = (e) => {

    // get photo src
    let photoSrc = $(e.currentTarget).attr('src');

    // set to and show photo frame Modal
    $('#photoframe img').attr('src', photoSrc);
    $('#photoframe').modal('show');
}
