var time = ''
var ipAddreses = []
exports.addIp = (ipAdress) => {
    if(time == ''){
        time  = Date.now()
        console.log(time)
    }
    if(!ipAddreses[`${ipAdress}`]){
        ipAddreses[`${ipAdress}`] = 0
    }
    ipAddreses[`${ipAdress}`] = ipAddreses[`${ipAdress}`]+1;
    if(ipAddreses[`${ipAdress}`] > 100){
        return false
    }
    if(Date.now() - time > 15*60*60){
        time = Date.now()
        ipAdress = []
    }
    return true;
}
