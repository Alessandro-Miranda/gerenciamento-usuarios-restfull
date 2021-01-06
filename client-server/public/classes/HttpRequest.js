class HttpRequest
{
    static get(url, params = {})
    {
        return HttpRequest.request('GET', url, params);
    }
    static post(url, params = {})
    {
        return HttpRequest.request('POST', url, params);
    }
    static put(url, params = {})
    {
        return HttpRequest.request('PUT', url, params);
    }
    static delete(url, params = {})
    {
        return HttpRequest.request('DELETE', url, params);
    }
    static request(method, url, params = {})
    {
        return new Promise((resolve, reject) => {
            let ajax = new XMLHttpRequest();
            let obj = {};
    
            ajax.open(method.toUpperCase(), url);
    
            ajax.onerror = e => reject(e);

            ajax.onload = () => {

                try
                {
                    console.log(obj);
                    obj = JSON.parse(ajax.responseText);
                }
                catch(e)
                {
                    console.error(e);
                    reject(e);
                }
    
                resolve(obj);
            };
    
            ajax.send();
        });
    }
}