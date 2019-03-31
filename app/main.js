// Main app logic

const _init = () => {
    // Switch on the camera as app is launched
    $('#viewfinder').on("show.bs.modal", () => {
        console.log("camera on");
    });

    // Switch off the camera in viewfinder
    $('#viewfinder').on("hidden.bs.modal", () => {
        console.log("camera off");
    });

    // Take Photo
    $('#shutter').on("click", () => {
        console.log('take photo')
    });

    // Submit messages
    $('#send').on("click", () => {

        // Get caption textarea
        let caption = $('#caption').val();

        // Check mssage is okay
        if(/*!photo || */!caption) {
            toastr.warning("Photo & Caption required", 'Incomplete Message');
            return
        }
        console.log('adding message');
        console.log(caption)

        // Reset caption field on success
        $('#caption').val('');
    });
}
