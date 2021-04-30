import React from 'react';

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
            requestURL = requestURL.concat("&")
        }
        i++;
    }
    return requestURL;
}

export const getFilteredObject = (rawObject={}, allowedFields=[]) => {
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

export const getJobPosition = (job_position) => {
    switch(job_position)
    {
        case 'O':
            return "Owner"
        case 'AM':
            return "Account Manager"
        case 'D':
            return "Deliveryman"
        case 'P':
            return "Production Employee"
        case 'C':
            return 'Client'
        default:
            return "Client"
    }
}

export const limitVisibility = (element, roles, job_position, exclude=false) => {
    if(job_position === null || job_position === "")
    {
        job_position = 'C';
    }
    if(exclude===false)
    {
      if(roles.includes(job_position) || roles.length === 0)
      {
        // console.log("YEAH", element);
        return element;
      }
    }
    else
    {
      if(!(roles.includes(job_position)))
      {
        // console.log("YEAH NO", element);
        return element;
      }
    }
    // console.log("WTF happened?", roles, job_position, exclude);
    return <></>
  }