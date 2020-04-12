export function displayDate(value) {
  var date = new Date(value)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false})}`
}

export function displayDatedebug(value) {
  var date = new Date(value)
  console.log(value, date)
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute:'2-digit', hour12: false})}`
}

export function displayRole(role) {
  const DB_ROLE = {admin: 'Admin', pm: "Project Manager", dev: "Developer", tester: "Tester"}
  return DB_ROLE[role]
}

export function displayStatus(status) {
  const DB_STATUS = {open: 'Open', close: "Close"}
  return DB_STATUS[status]
}

export function displayPriority(priority) {
  if (priority == null) return "Unspecified"
  const DB_PRIORITY = {low: "Low", medium: "Medium", high: "High", severe: "Severe"}
  return DB_PRIORITY[priority]
}


var filters = { displayDate }

function installFilters (vue) {
  Object.entries(filters).forEach(([filterLabel, filter]) => {
    vue.filter(filterLabel, filter)
  })
}

export default installFilters;