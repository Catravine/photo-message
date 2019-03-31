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
        console.log('adding message');
        console.log(caption)

        // Reset caption field on success
        $('#caption').val('');
        $('#camera').css('background-image', '').removeClass('withPhoto')
        camera.photo = null;
    });
}
