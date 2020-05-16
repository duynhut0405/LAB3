const fs = require('fs')

exports.getFile = function(req, res, next){    
    fs.readFile('./products.txt','utf8', function read(err, data) {
        if (err) {
            return res.json( {err} ) 
        }
        var arr = data.toString().split('\r\n');
        var arrJSON = [];
        for (i in arr){
            arr[i] = arr[i].split('|');
        }
        var oje = [ 'id', 'title', 'price', 'producer', 'number', 'sumary','image', 'status' ];
        for (i in arr){
            arrJSON[i] = '{';
            for (j in arr[i]){
                arrJSON[i] = arrJSON[i] + '"'+ oje[j] + '" : "'+ arr[i][j] + '"';
                if ( j != 6 ) arrJSON[i] += ', ';
                if ( j == 4 ) {
                    if ( arr[i][j] == '0' ) {
                        arrJSON[i] = arrJSON[i] + '"'+ oje[7] + '" : "'+ "Hết hàng" + '",';
                    } else {
                        arrJSON[i] = arrJSON[i] + '"'+ oje[7] + '" : "'+ "Còn hàng" + '",';
                    }
                }
            }
            arrJSON[i] += '}';
        }
        var arrJSON2 = [];
        for (i in arrJSON){
            arrJSON2.push(JSON.parse(arrJSON[i]))
        }

        res.send(arrJSON2) 
    });
}



exports.postFile = function(req, res, next){    

    var data = '';
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let ngay ='';
    let gio = '';
    ngay += year + "-" + month + "-" + date + "  "
    gio += hours + ":" + minutes + ":" + seconds

    if ( hours < 13 && hours >= 0){
        gio += " AM\r\n"
    }else {
        gio += " PM\r\n"
    }

    data += req.body.hoten + '|' + req.body.email + '|' + req.body.sdt + '|' + req.body.thongdiep + '|' +  ngay + gio

    fs.appendFile("./Lab2-Bai2.txt", data, (err) => {
        if (err) console.log(err);
        res.json({
            message: 'SUCCES',
        })
    });
}