import { Format } from '../utils/Format';
import { CameraController } from './CameraController';
import { MicrophoneController } from './MicrophoneController'
import { DocumentPreviewController } from './DocumentPreviewController';

export class WhatsAppController {

    constructor() {
        this.elementsPrototype();
        this.initElements();
        this.initEvents();
    }

    initEvents() {

        this.el.myPhoto.on('click dblclick', e => {
            this.closeAllPanelLeft();
            this.el.panelEditProfile.show().addClass('open');

        })

        this.el.btnNewContact.on('click', e => {
            this.closeAllPanelLeft();
            this.el.panelAddContact.show().addClass('open');

        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        });

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        })

        this.el.imgDefaultPanelEditProfile.on('click', e => {
            this.el.inputProfilePhoto.click();
        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {

            if (e.key == 'Enter') {
                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();
            }

        });

        this.el.btnSavePanelEditProfile.on('click', e => {
            console.log(this.el.inputNamePanelEditProfile.innerHTML);

        });

        this.el.formPanelAddContact.on('submit', e => {
            e.preventDefault();

        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach(item => {

            item.addEventListener('click', e => {

                this.el.home.hide();
                this.el.main.css({ display: "flex" });

            });

        });

        this.el.btnAttach.on('click', e => {
            e.stopPropagation();

            this.el.menuAttach.show().addClass('open');

            document.addEventListener('click', this.closeMenuAttach.bind(this));

        })

        this.el.btnAttachPhoto.on('click', e => {
            this.el.inputPhoto.click();
        })

        this.el.inputPhoto.on('change', e => {
            [...this.el.inputPhoto.files].forEach(file => {
                console.log(file);
            })
        });

        this.el.btnAttachCamera.on('click', e => {
            this.closeAllMainPanel();
            this.el.pictureCamera.hide();
            this.el.panelCamera.addClass('open').css({
                height: "100%"
            })

            this._camera = new CameraController(this.el.videoCamera);

        })

        this.el.btnClosePanelCamera.on('click', e => {
            this.closeAllMainPanel();
            this._camera.stop();
            this.el.panelMessagesContainer.show();

        });

        this.el.btnTakePicture.on('click', e => {

            let dataUrl = this._camera.takePicture();
            this.el.videoCamera.removeClass('open');
            this.el.btnReshootPanelCamera.show();

            this.el.pictureCamera.show().css({
                width: "auto",

            });

            this.el.containerSendPicture.show();
            this.el.containerTakePicture.hide();
            this.el.pictureCamera.src = dataUrl;
        });

        this.el.btnReshootPanelCamera.on('click', e => {
            this.el.pictureCamera.hide()
            this.el.btnReshootPanelCamera.hide();
            this.el.videoCamera.addClass('open');

            this.el.containerSendPicture.hide();
            this.el.containerTakePicture.show();
        });

        this.el.btnSendPicture.on('click', e => {
            let img = this.el.pictureCamera.src;
            console.log(img);
        });

        this.el.btnAttachDocument.on('click', e => {
            this.closeAllMainPanel();

            this.el.panelDocumentPreview.addClass('open').css({
                height: "100%"
            })

            this.el.inputDocument.click();

        });

        this.el.inputDocument.on('change', e => {

            if (this.el.inputDocument.files.length) {

                let file = this.el.inputDocument.files[0];

                this._documentPreview = new DocumentPreviewController(file);

                this._documentPreview.getPreviewData().then(data => {
                    console.log(data.canvas.toDataURL());
                    this.el.imgPanelDocumentPreview.src = data.src;
                    this.el.infoPanelDocumentPreview.innerHTML = data.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();

                }).catch(e => {
                    console.log(file.type);
                    this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show();

                    switch (file.type) {

                        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":

                            this.el.iconPanelDocumentPreview.className = "jcxhw icon-doc-doc";
                            break;

                        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                            this.el.iconPanelDocumentPreview.className = "jcxhw icon-doc-ppt";
                            break;

                        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                            this.el.iconPanelDocumentPreview.className = "jcxhw icon-doc-xls";
                            break;

                        default:
                            this.el.iconPanelDocumentPreview.className = "jcxhw icon-doc-generic";
                    }

                    this.el.filenamePanelDocumentPreview.innerHTML = file.name;
                })
            }

        });

        this.el.btnClosePanelDocumentPreview.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        this.el.btnSendDocument.on('click', e => {
            console.log('send document ..... ');
        });

        this.el.btnAttachContact.on('click', e => {
            this.el.modalContacts.show();
        })

        this.el.btnCloseModalContacts.on('click', e => {
            this.el.modalContacts.hide();
        });

        this.el.btnSendMicrophone.on('click', e => {

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();

            this._microphone = new MicrophoneController();

            this._microphone.on('ready', audio => {

                //console.log("READY.....", audio);
                this._microphone.startRecorder();

            });

            this._microphone.on('timer', time => {
                this.el.recordMicrophoneTimer.innerHTML = Format.toTime(time);
            });

        });

        this.el.btnFinishMicrophone.on('click', e => {
            this.closeRecordMicrophone();
            this._microphone.stopRecorder();

        });

        this.el.btnCancelMicrophone.on('click', e => {
            this.closeRecordMicrophone();
            this._microphone.stopRecorder();

        });

        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.ctrlKey) {
                e.preventDefault();
                this.el.btnSend.click();
            }



        });

        this.el.inputText.on('keyup', e => {

            if (this.el.inputText.innerHTML.length) {
                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();
            } else {
                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }

        });

        this.el.btnSend.on('click', e => {
            console.log('ENVIANDO SUA MSG');
        });

        this.el.btnEmojis.on('click', e => {
            this.el.panelEmojis.toggleClass('open');
        });

        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

            emoji.on('click', e => {
                let img = this.el.imgEmojiDefault.cloneNode();

                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;

                emoji.classList.forEach(name => {
                    img.addClass(name);
                });

                let cursor = window.getSelection();

                if (cursor.focusNode.id == 'input-text' || !cursor.focusNode) {
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }

                let range = document.createRange();
                range = cursor.getRangeAt(0);
                range.deleteContents();

                let frag = document.createDocumentFragment();
                frag.appendChild(img);

                range.insertNode(frag)

                range.setStartAfter(img);

                this.el.inputText.dispatchEvent(new Event('keyup'));
            });

        });

    }



    closeRecordMicrophone() {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
    }

    closeAllMainPanel() {
        this.el.panelMessagesContainer.hide();
        this.el.panelCamera.removeClass('open');
        this.el.panelDocumentPreview.removeClass('open');
    }


    closeAllPanelLeft() {
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }

    closeMenuAttach(e) {

        this.el.menuAttach.removeClass('open');
        document.removeEventListener('click', this.closeMenuAttach);

    }


    initElements() {
        this.el = {};

        document.querySelectorAll("[id]").forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });

    }

    elementsPrototype() {

        Element.prototype.hide = function () {
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display == 'none') ? 'block' : 'none';
            return this;
        }

        Element.prototype.on = function (events, fn) {
            events.split(" ").forEach(event => {
                this.addEventListener(event, fn);
            });
            return this;
        }

        Element.prototype.css = function (styles) {
            for (let name in styles) {
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function (className) {
            this.classList.add(className);
            return this;
        }

        Element.prototype.removeClass = function (className) {
            this.classList.remove(className);
            return this;
        }

        Element.prototype.toggleClass = function (className) {
            this.classList.toggle(className);
            return this;
        }

        Element.prototype.hasClass = function (className) {
            return this.classList.contains(className);
        }

        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function () {
            let json = {};

            this.getForm().forEach((key, value) => {
                json[key] = value;
            });

            return json;
        }
    }

}