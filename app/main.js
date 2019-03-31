// Init new camera instance on the player node
const camera = new Camera(document.getElementById('player'));

// Main app logic
const _init = () => {
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

        // Render new message in feed
        renderMessage({ photo: camera.photo, caption });

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
