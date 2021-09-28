class WhatsAppController {

    constructor() {
        this.initElements();
    }

    initElements() {
        this.el = {};

        document.querySelectorAll("[id]").forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });

        

    }
}