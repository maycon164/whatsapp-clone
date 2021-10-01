export class CameraController {

    constructor(videoEl) {
        this.videoEl = videoEl;

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream => {
            this._stream = stream;
            this.videoEl.srcObject = stream;
            this.videoEl.play();
        }).catch(e => console.log(e));

    }

    stop() {

        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    takePicture(mimeType = 'image/png') {
        let canvas = document.createElement('canvas');
        canvas.setAttribute('height', this.videoEl.videoHeight);
        canvas.setAttribute('width', this.videoEl.videoWidth);

        let context = canvas.getContext('2d');
        context.drawImage(this.videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);
    }

}