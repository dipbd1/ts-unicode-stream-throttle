import * as iconv from 'iconv-lite';
import * as http from 'http';
import * as fs from 'fs';
import * as Throttle from 'throttle';
import * as path from 'path';

http.createServer(function (req, res) {
    // req.on('data', (data)=>{
    // 	console.log(iconv.decode(data, 'win1251'))
    // })    // on data receive
	var converterStream = iconv.decodeStream('win1251');
	let writeStream = fs.createWriteStream('secret.txt'); // Do something with decoded strings, chunk-by-chunk.
    req.pipe(converterStream);

    converterStream.on('data', function (str) {
        writeStream.write(str);
        res.write(str);
    });

    converterStream.on('finish', () => {
        res.end();
    });
    // converterStream.pipe(res);
    // let throttle = new Throttle(100);
    // let filePath = path.basename('C:\\Users\\BS498\\Downloads\\big.txt');
    // let file = fs.createReadStream('C:\\Users\\BS498\\Downloads\\Programs\\android-studio-ide-201.6953283-windows.exe');
    // let utfConvertedStream = fs.createWriteStream('secret.txt');
    // file.pipe(res);
    // throttle.pipe(res)

    // file.pipe(converterStream)
    // converterStream.pipe(throttle)
    // throttle.pipe(res);

    // converterStream.pipe(utfConvertedStream);
    // converterStream.pipe(res);
    // converterStream.pipe(fs.createWriteStream('secret.txt'));
}).listen(3000);
