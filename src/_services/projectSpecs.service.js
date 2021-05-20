import axios from "axios";
import authHeader from "./auth-header";
import {getFilteredObject} from "../_helpers";

const retrieveLaminationTypes = (cancelToken) => {
    return axios.get('api/laminations', {cancelToken: cancelToken})
    .then((response)=>{
        console.log("Lamination types received:")
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
    // TODO: Test lamination types retrieval axios call
}

const retrieveBindingTypes = (cancelToken) => {
    return axios.get('api/bindings', {cancelToken: cancelToken})
    .then((response)=>{
        console.log("Binding types received:")
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
    // TODO: Test binding types retrieval axios call
}

const retrievePaperTypes = (cancelToken) => {
    return axios.get('api/papers', {cancelToken: cancelToken})
    .then((response)=>{
        console.log("Paper types received:")
        console.log(response.data);
    })
    .catch((error)=>{
        console.log(error);
    })
    // TODO: Test paper types retrieval axios call
}

export default {
    retrieveLaminationTypes,
    retrieveBindingTypes,
    retrievePaperTypes
}