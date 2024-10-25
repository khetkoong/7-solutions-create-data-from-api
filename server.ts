import { sendUnaryData, ServerUnaryCall } from '@grpc/grpc-js'
import { FilterDataReply, FilterDataRequest, FilterDataService } from './generated/protos/filterdata'
import { getUsers } from './func'

const grpc = require('@grpc/grpc-js')

async function getFilterData(
  call: ServerUnaryCall<FilterDataRequest, FilterDataReply>,
  callback: sendUnaryData<FilterDataReply>
) {
  const users = await getUsers()
  callback(null, { result: JSON.stringify(users, null, 2) as unknown as string })
}


function main() {
  const server = new grpc.Server()
  server.addService(FilterDataService, { getFilterData: getFilterData })
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start()
  })
}

main()