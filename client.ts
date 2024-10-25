import { FilterDataClient } from './generated/protos/filterdata'

const grpc = require('@grpc/grpc-js')

function main() {
  const client = new FilterDataClient('localhost:50051', grpc.credentials.createInsecure())
  client.getFilterData(null, function (err, response) {
    console.log(response.result)
  })
}

main()