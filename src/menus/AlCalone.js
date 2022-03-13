const axios = require("axios");
const url = "https://www.pizzaalcapone.cz/poledni-menu?id=0fda65605cdd11eca4000cc47a0ca484&do=chooseAlcBranch"

const test = async () => {
    let cookie;

    await axios.get(url, {headers: {Cookie: ['_nss=1; Path=/; Secure; HttpOnly; SameSite=Strict; Domain=www.pizzaalcapone.cz', 'PHPSESSID=ca1i760fb0n14itnsie5op572a; Expires=Sun, 27 Mar 2022 01:09:36 GMT; Max-Age=1206000; Path=/; Secure; HttpOnly; SameSite=Lax; Domain=www.pizzaalcapone.cz']}}).then(res => console.log(res.config, res.headers))

    await axios.get(url).then(res => cookie = res.headers['set-cookie'])

    console.log('opat', cookie)

    await axios.get(url, {headers: {Cookie: cookie}}).then(res => console.log(res.config))
}

test()
