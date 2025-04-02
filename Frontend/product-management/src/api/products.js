import { makeHTTPGETRequest, makeHTTPPOSTRequest, makeHTTPPUTRequest, makeHTTPDELETERequest } from "./abstract";

function getURL(endpoint=""){
    return "api/products/" + endpoint;
}

export async function getAllProducts() {
    const endpoint = getURL();
    console.log(endpoint);
    return makeHTTPGETRequest(endpoint).then((response)=>{
        return response.data;
    }).catch((error)=>{
        console.error('Get All Products API to HTTP Get', error);
    })
}

export async function getProduct(productId) {
    const endpoint = getURL(productId);
    console.log(endpoint);
    return makeHTTPGETRequest(endpoint).then((response)=>{
        return response;
    }).catch((error)=>{
        console.error('Get Product API to HTTP Get', error);
    })
}

export async function createProduct() {
    const endpoint = getURL();
    console.log(endpoint);
    return makeHTTPPOSTRequest(endpoint).then((response)=>{
        return response;
    }).catch((error)=>{
        console.error('Create Product API to HTTP Post', error);
    })
}

export async function updateProduct(productId) {
    const endpoint = getURL(productId);
    console.log(endpoint);
    return makeHTTPPUTRequest(endpoint).then((response)=>{
        return response;
    }).catch((error)=>{
        console.error('Update Product API to HTTP Put', error);
    })
}

export async function deleteProduct(productId) {
    const endpoint = getURL(productId);
    console.log(endpoint);
    return makeHTTPDELETERequest(endpoint).then((response)=>{
        return response;
    }).catch((error)=>{
        console.error('Delete Product API to HTTP Delete', error);
    })
}

