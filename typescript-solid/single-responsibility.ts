let httpClient = new HttpClient();
filterEmployees(httpClient, []).then(employees => {
      displayEmployees(employees);
      recordEmployee(employees, httpClient);
});

export function filterEmployees(httpClient, filters): Promise<any> {
  try {
    filters = removeDuplicateFilters(filters);
    return httpClient.get("/api/employees").then(employees => {

      let result = applyFilters(employees);
      return result;

    }).catch(err => {
      handleError(err, "Something went wrong while processing the employee");
    });
  }

  catch(err) {
     handleError(err, "Application critical error");
  }
}


function recordEmployee(result: any[], httpClient: any) {
  result.forEach(employee => {
    httpClient.post("/api/employees/record", employee);
  });
}

function displayEmployees(result: any[]) {
  let list = document.getElementById("employees-list");
  result.forEach(employee => {
    let employeeItem = document.createElement('li');
    employeeItem.innerHTML = `<strong>${employee.lastTime}</strong> ${employee.firstName}`;
    list.appendChild(employeeItem);
  });
}

function handleError(err, msg) {
  console.error(msg);
  let messageBox = new MessageBox();
  messageBox.show(msg);
}





// code below here is to stop linting errors. ignore them
function removeDuplicateFilters(filters) {
  // exists only to stop lint errors
}

function applyFilters(filters): any[]{
  // exists only to stop lint errors
  return [];
}

export class MessageBox {
  // exists only to stop lint errors
  show(msg) {

  }
}
