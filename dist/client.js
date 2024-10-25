"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filterdata_1 = require("./generated/protos/filterdata");
var grpc = require('@grpc/grpc-js');
function main() {
    var client = new filterdata_1.FilterDataClient('localhost:50051', grpc.credentials.createInsecure());
    client.getFilterData(null, function (err, response) {
        console.log(response.result);
    });
}
main();
