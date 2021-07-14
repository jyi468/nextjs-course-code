//Head component from next/document is not same as Head from next/document
// Latter must be used only in _document.js
import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head/>
                <body>
                <div id="overlays"/>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

export default MyDocument;
