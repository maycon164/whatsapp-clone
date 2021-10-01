export class Format {

    static getCamelCase(txt) {
        let div = document.createElement("div");
        div.innerHTML = `<div data-${txt} = "id"> </div>`;

        return Object.keys(div.firstChild.dataset)[0];

    }

    static toTime(time) {
        let seconds = parseInt((time / 1000) % 60);
        let minutes = parseInt((time / (1000 * 60)) % 60);

        return `${minutes}:${seconds.toString().padStart(2, 0)}`;
    }
}