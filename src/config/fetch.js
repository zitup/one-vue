let baseUrl = "http://v3.wufazhuce.com:8000/api";

export default (url, method = 'GET') =>{
    return fetch(baseUrl + url, {meghot: method})
}