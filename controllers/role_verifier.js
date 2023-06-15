/**
 * This function verifies a role is authenticated to do a task.
 * Example:
 * Task: Adding a new user as an employee.
 * Role: Sale - is only scoped to read and approve incoming client data, i.e products,industries, e.t.c
 * Verifier: returns a truthy or falsy value to determine whether this role is capable of addin a new user.
 *  
 */
const Admin_scope_roles = require("../models/Admin/Admin_scope_roles.js");


const fetch_roles=async(payload)=>{
    /**
     * Fetches roles in the db
     */
    let title = payload.role
    const role = await Admin_scope_roles.findOne({title:title});
    return role;
}

const Verifier=async(verify_role_payload)=>{
    /**
     * handles selecting the task that is expected.
     * switchstatement helps in selecting.
     * Returns a Boolean value that will be used to authenticate the request.
     *      res(Boolean)
     */
    const role_data = await fetch_roles(verify_role_payload);
    //console.log(role_data);
    let res;
    switch (verify_role_payload.task) {
        case "roles":
            res = Handle_roles_scopes(role_data,verify_role_payload)
            return res;
        case "administrators":
            res = Handle_Administrators_scopes(role_data,verify_role_payload)
                return res
        case "products":
            res = Handle_Product_scopes(role_data,verify_role_payload)
                return res
        case "customers":
            res = Handle_Customer_scopes(role_data,verify_role_payload)
                return res
        case "distributors":
            res = Handle_Distributors_scopes(role_data,verify_role_payload)
                return res
        case "manufacturers":
            res = Handle_Manufacturers_scopes(role_data,verify_role_payload)
                return res
        case "salespeople":
            res = Handle_Salespeople_scopes(role_data,verify_role_payload)
                return res
        case "industries":
            res = Handle_Industries_scopes(role_data,verify_role_payload)
                return res
        case "technologies":
            res = Handle_Technologies_scopes(role_data,verify_role_payload)
                return res
        case "orders":
            res = Handle_Orders_scopes(role_data,verify_role_payload)
                return res
        case "requests":
            res = Handle_Requests_scopes(role_data,verify_role_payload)
                return res
        case "support_questions":
            res = Handle_Support_Questions_scopes(role_data,verify_role_payload)
                return res
        case "request_demo_tickets":
            res = Handle_Request_Demo_Tickets_scopes(role_data,verify_role_payload)
                return res
        default:
          return false;   
      }
}

const Handle_roles_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "add_roles":
            result = role_data?.roles_scopes?.find((scope)=> scope == 'add')
            if (result){
                return true;
            }else{
                return false;
            }
        case "edit_roles":
            result = role_data?.roles_scopes?.find((scope)=> scope == 'edit')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete_roles":
            result = role_data?.roles_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Administrators_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "add_user":
            result = role_data?.administrator_scopes?.find((scope)=> scope == 'add')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete_user":
            result = role_data?.administrator_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Product_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "add_product":
            result = role_data?.product_scopes?.find((scope)=> scope == 'add')
            if (result){
                return true;
            }else{
                return false;
            }
        case "edit_product":
            result = role_data?.product_scopes?.find((scope)=> scope == 'edit')
            if (result){
                return true;
            }else{
                return false;
            }
        case "approve_product":
            result = role_data?.product_scopes?.find((scope)=> scope == 'verify')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete_product":
            result = role_data?.product_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        case "feature_product":
            result = role_data?.product_scopes?.find((scope)=> scope == 'feature')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un-feature_product":
            result = role_data?.product_scopes?.find((scope)=> scope == 'un-feature')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un-verify_product":
            result = role_data?.product_scopes?.find((scope)=> scope == 'unverify')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Customer_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "suspend":
            result = role_data?.client_scopes?.find((scope)=> scope == 'suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un-suspend":
            result = role_data?.client_scopes?.find((scope)=> scope == 'un-suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.client_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Distributors_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "approve":
            result = role_data?.distributors_scopes?.find((scope)=> scope == 'approve')
            if (result){
                return true;
            }else{
                return false;
            }
        case "suspend":
            result = role_data?.distributors_scopes?.find((scope)=> scope == 'suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un-suspend":
            result = role_data?.distributors_scopes?.find((scope)=> scope == 'un-suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "subscribe":
            result = role_data?.distributors_scopes?.find((scope)=> scope == 'subscribe')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un_subscribe":
            result = role_data?.distributors_scopes?.find((scope)=> scope == 'un_subscribe')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.distributors_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Manufacturers_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "approve":
            result = role_data?.manufacturers_scopes?.find((scope)=> scope == 'approve')
            if (result){
                return true;
            }else{
                return false;
            }
        case "suspend":
            result = role_data?.manufacturers_scopes?.find((scope)=> scope == 'suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un-suspend":
            result = role_data?.manufacturers_scopes?.find((scope)=> scope == 'un-suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "subscribe":
            result = role_data?.manufacturers_scopes?.find((scope)=> scope == 'subscribe')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un_subscribe":
            result = role_data?.manufacturers_scopes?.find((scope)=> scope == 'un_subscribe')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.manufacturers_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Salespeople_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "approve":
            result = role_data?.salespeople_scopes?.find((scope)=> scope == 'approve')
            if (result){
                return true;
            }else{
                return false;
            }
        case "suspend":
            result = role_data?.salespeople_scopes?.find((scope)=> scope == 'suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un-suspend":
            result = role_data?.salespeople_scopes?.find((scope)=> scope == 'un-suspend')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.salespeople_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Industries_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "approve":
            result = role_data?.industries_scopes?.find((scope)=> scope == 'approve')
            if (result){
                return true;
            }else{
                return false;
            }
        case "add":
            result = role_data?.industries_scopes?.find((scope)=> scope == 'add')
            if (result){
                return true;
            }else{
                return false;
            }
        case "edit":
            result = role_data?.industries_scopes?.find((scope)=> scope == 'edit')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.industries_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        case "approve":
            result = role_data?.industries_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Technologies_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "approve":
            result = role_data?.technologies_scopes?.find((scope)=> scope == 'approve')
            if (result){
                return true;
            }else{
                return false;
            }
        case "add":
            result = role_data?.technologies_scopes?.find((scope)=> scope == 'add')
            if (result){
                return true;
            }else{
                return false;
            }
        case "edit":
            result = role_data?.technologies_scopes?.find((scope)=> scope == 'edit')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.technologies_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Orders_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "approve":
            result = role_data?.orders_scopes?.find((scope)=> scope == 'approve')
            if (result){
                return true;
            }else{
                return false;
            }
        case "add":
            result = role_data?.orders_scopes?.find((scope)=> scope == 'add')
            if (result){
                return true;
            }else{
                return false;
            }
        case "edit":
            result = role_data?.orders_scopes?.find((scope)=> scope == 'edit')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.orders_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        case "reject":
            result = role_data?.orders_scopes?.find((scope)=> scope == 'reject')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Requests_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "approve":
            result = role_data?.manufacturer_request_scopes?.find((scope)=> scope == 'approve')
            if (result){
                return true;
            }else{
                return false;
            }
        case "decline":
            result = role_data?.manufacturer_request_scopes?.find((scope)=> scope == 'decline')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Support_Questions_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "mark_as_solved":
            result = role_data?.support_questions_scopes?.find((scope)=> scope == 'mark_as_solved')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un_mark_as_solved":
            result = role_data?.support_questions_scopes?.find((scope)=> scope == 'un_mark_as_solved')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.support_questions_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

const Handle_Request_Demo_Tickets_scopes=(role_data,verify_role_payload)=>{
    let result;
    switch (verify_role_payload.sub_task) {
        case "mark_as_solved":
            result = role_data?.request_demo_scopes?.find((scope)=> scope == 'mark_as_solved')
            if (result){
                return true;
            }else{
                return false;
            }
        case "un_mark_as_solved":
            result = role_data?.request_demo_scopes?.find((scope)=> scope == 'un_mark_as_solved')
            if (result){
                return true;
            }else{
                return false;
            }
        case "delete":
            result = role_data?.request_demo_scopes?.find((scope)=> scope == 'delete')
            if (result){
                return true;
            }else{
                return false;
            }
        default:
          return false;   
      }
}

module.exports = Verifier;