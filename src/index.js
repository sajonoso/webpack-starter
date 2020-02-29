import JSZip from 'jszip'
import { saveAs } from 'file-saver';

const zip = new JSZip();
 
zip.file("Hello.txt", "Hello World\n");

zip.generateAsync({type:"blob"}).then(function(content) {
  saveAs(content, "example.zip");
});
