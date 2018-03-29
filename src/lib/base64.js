export class Base64 {
    getBase64File(encoded) {
        return encoded.substr(encoded.indexOf(',') + 1);
    }

    getBase64Type(encoded) {
        let result = "image/jpeg";
        if (typeof encoded !== 'string') {
            return result;
        }

        let mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        if (mime && mime.length) {
            result = mime[1];
        }

        return result;
    }
}