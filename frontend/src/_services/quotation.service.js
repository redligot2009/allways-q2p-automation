import axios from 'axios';
import {getResultURL, getFilteredObject} from "../_helpers/"

/*
///////////////////////////////
QUOTATION API SERVICE FUNCTIONS
///////////////////////////////
*/

const createQuotation = (quotation) => {
    // console.log(quotation);
    const allowedQuotationFields = [
        "project_name",
        "product_type",
        "created_date",
        "client",
        "approval_status",
        "printing_process",
        "quantity",
        "items"
    ]
    const allowedQuotationItemFields = [
        'lamination',
        'binding',
        'paper',
        'extra_plates',
        'item_type',
        'no_colors',
        'quotation'
    ]
    
    const filteredQuotationData = getFilteredObject(quotation,allowedQuotationFields)
    const filteredQuotationItemsData = getFilteredObject(quotation.items,allowedQuotationItemFields)
    filteredQuotationData.items = filteredQuotationItemsData;
    
    const createResult = axios.post(`api/quotations/`,filteredQuotationData)
    return createResult;
}

const retrieveQuotation = (id) => {
    const quoteResult = axios.get(`api/quotations/${id}`)
    return quoteResult;
}

const retrieveQuotations = (approval_status=null,client=null) => {
    // TODO: Add support for filtering quotations by client
    const urlParams = {
        "approval_status" : approval_status,
        "client" : client,
    }
    let requestURL = getResultURL("api/quotations/", urlParams);
    const quotationsListResult = axios.get(requestURL);
    return quotationsListResult;
}

const deleteQuotation = (id) => 
{
  // TODO: Implement API call to delete quotation by ID.
}

const updateQuotation = (quotation) => {
    // console.log(quotation);
    const allowedQuotationFields = [
        "project_name",
        "product_type",
        "approval_status",
        "printing_process",
        "quantity",
        "total_pages",
        "markup_percentage",
        "margin_of_error",
        "items",
        "page_length",
        "page_width",
        "pages_can_fit",
        "total_binding_costs",
        "total_folds",
        "cutting_costs",
        "packaging_costs",
        "transport_costs",
    ]
    const allowedQuotationItemFields = [
        'id',
        'lamination',
        'binding',
        'paper',
        'extra_plates',
        'item_type',
        'no_colors',
        'no_plates_per_copy',
        'no_impressions_per_plate',
        'no_sheets_ordered_for_copy',
        'quotation'
    ]

    const filteredQuotationData = getFilteredObject(quotation,allowedQuotationFields)
    const filteredQuotationItemsData = getFilteredObject(quotation.items,allowedQuotationItemFields)
    filteredQuotationData.items = filteredQuotationItemsData;

    const updateResult = axios.put(`api/quotations/${quotation.id}/`,filteredQuotationData)
    console.log(filteredQuotationData);
    console.log(JSON.stringify(filteredQuotationData));
    return updateResult;
}

// eslint-disable-next-line
export default 
{
    createQuotation, 
    retrieveQuotation,
    updateQuotation,
    retrieveQuotations,
    deleteQuotation,
};