const _ = require("lodash")

const formattedData = (departments) => {
  return _.map(departments, (department, key) => {
    const groupedHairColor = _.groupBy(department, 'hair.color')

    let addressUserObj = {}
    _.map(department, (user) => {
      addressUserObj[`${user.firstName}${user.lastName}`] = user?.address.postalCode
    })

    let hairObj = {}
    _.map(groupedHairColor, (h, key) => {
      hairObj[key] = _.filter(h, (h1) => h1.hair.color === key).length
    })

    return {
      [key]: {
        male: _.filter(department, { gender: 'male' }).length,
        female: _.filter(department, { gender: 'female' }).length,
        ageRange: `${_.minBy(department, (user) => user.age).age}-${_.maxBy(department, (user) => user.age).age}`,
        hair: hairObj,
        addressUser: addressUserObj
      }
    }
  })
}

export const getUsers = async () => {
  const response = await fetch('https://dummyjson.com/users')
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`)
  }
  const json = await response.json()
  const departmentGrouped = _.groupBy(json?.users, 'company.department')
  return formattedData(departmentGrouped)
}