export function displayDate(value) {
  var date = new Date(value)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false})}`
}

export function displayRole(role) {
  const DB_ROLE = {admin: 'Admin', pm: "Project Manager", dev: "Developer", tester: "Tester"}
  return DB_ROLE[role]
}

var filters = { displayDate }

function installFilters (vue) {
  Object.entries(filters).forEach(([filterLabel, filter]) => {
    vue.filter(filterLabel, filter)
  })
}

export default installFilters;