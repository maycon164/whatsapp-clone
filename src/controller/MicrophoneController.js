import { ClassEvent } from "../utils/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor() {

        super();

        this._isAvailable = false;
        this._mimeType = "audio/webm";

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            this._stream = stream;
            this._isAvailable = true;

            this.trigger('ready', this._stream);

        }).catch(e => console.log(e));

    }

    stop() {

        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }

    isAvailable() {
        return this._isAvailable;
    }

    startRecorder() {

        if (this.isAvailable()) {

            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecorder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) this._recordedChunks.push(e.data);

            });

            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });

                let filename = `rec${Date.now()}.webm`;

                let file = new File([blob], filename, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });

            });

            this._mediaRecorder.start();
        }
    }

    stopRecorder() {

        if (this.isAvailable()) {
            this._mediaRecorder.stop();
            this.stop();
        }

    }

}