class WhatsAppController {

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

            this.el.panelCamera.addClass('open').css({
                height: "100%"
            })

        })

        this.el.btnClosePanelCamera.on('click', e => {
            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();

        });

        this.el.btnTakePicture.on('click', e => {
            console.log("TAKE A PICTURE");
        });

        this.el.btnAttachDocument.on('click', e => {
            this.closeAllMainPanel();

            this.el.panelDocumentPreview.addClass('open').css({
                height: "100%"
            })

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
            this.startRecordMicrophoneTime();
        });

        this.el.btnFinishMicrophone.on('click', e => {
            this.closeRecordMicrophone();
        });

        this.el.btnCancelMicrophone.on('click', e => {
            this.closeRecordMicrophone();
        })

    }

    startRecordMicrophoneTime() {
        let start = Date.now();

        this._microphoneTimer = setInterval(() => {
            this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start));
        }, 100);

    }

    closeRecordMicrophone() {
        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._microphoneTimer);
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