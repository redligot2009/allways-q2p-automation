export const getResultURL = (baseURL="api/",urlParams = {}) => {
    let requestURL = baseURL;
    let foundFirstParam = false;
    let i = 0;
    for(let key in urlParams)
    {
        if(urlParams[key])
        {
            if(!foundFirstParam)
            {
                requestURL = requestURL.concat("?")
                foundFirstParam = true;
            }
            requestURL = requestURL.concat(`${key.toString()}=${urlParams[key]}`)
            if(i > 0 && i < urlParams.length-1)
                requestURL = requestURL.concat("&")
        }
        i++;
    }
    return requestURL;
}

export const getFilteredObject = (rawObject={}, allowedFields={}) => {
    if(Array.isArray(rawObject))
    {
        let filteredObjects = []
        for(let i = 0; i < rawObject.length; i++)
        {
            let item = rawObject[i]
            let filteredObject = Object.keys(item)
            .filter(key=>allowedFields.includes(key))
            .reduce((object,key)=>{
                object[key] = item[key]
                return object;
            },{});
            filteredObjects.push(filteredObject);
        }
        return filteredObjects;
    }
    else
    {
        const filteredObject = Object.keys(rawObject)
            .filter(key => allowedFields.includes(key))
            .reduce((object,key)=>{
                object[key] = rawObject[key]
                return object
            }, {});
        return filteredObject
    }
}