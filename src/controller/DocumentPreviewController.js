const pdfjsLib = require('pdfjs-dist');
const path = require('path');

pdfjsLib.GlobalWorkerOptions.workerSrc = path.resolve(__dirname, '../../dist/pdf.worker.bundle.js')

export class DocumentPreviewController {

    constructor(file) {
        this._file = file;
    }

    getPreviewData() {

        return new Promise((resolve, reject) => {

            let reader = new FileReader();
            switch (this._file.type) {

                case "image/png":
                case "image/jpg":
                case "image/jpeg":
                case "image/gif":

                    reader.onload = () => {
                        resolve({
                            src: reader.result,
                            info: this._file.name
                        })
                    };

                    reader.onerror = e => {
                        reject(e);
                    }
                    reader.readAsDataURL(this._file);
                    break;

                case "application/pdf":
                    reader = new FileReader();

                    reader.onload = e => {
                        console.log(reader.result)
                        pdfjsLib.getDocument(new Uint8Array(reader.result)).then(pdf => {

                            pdf.getPage(1).then(pag => {

                                let viewport = pag.getViewport();
                                let canvas = document.createElement('canvas');
                                let canvasContext = canvas.getContext('2d');

                                canvas.width = viewport.width;
                                canvas.height = viewport.height;

                                pag.render({
                                    canvasContext,
                                    viewport
                                }).then(() => {

                                    resolve({
                                        canvas,
                                        src: canvas.toDataURL(),
                                        info: `${pdf.numPages} paginas`
                                    });

                                }).catch(error => {
                                    reject(err);
                                });

                            }).catch(error => {
                                reject(err);
                            });

                        }).catch(error => {
                            console.log("error: ", error);
                        });

                    }
                    reader.readAsArrayBuffer(this._file);

                    break;
                default:
                    reject();
            }


        })

    }

}