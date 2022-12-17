import axios from 'axios';
import { groupBy } from 'lodash';

export async function getEmployees() {
    try {
      const response = await axios
      .get('https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==');
      const groupedEmployees = groupBy(response.data, "EmployeeName");
      const employees: {name: string, hours: number}[] = [];
      for (const [key, value] of Object.entries(groupedEmployees)) {
        if(key){
          const employee = {name: key, hours: 200};
          employees.push(employee);
          console.log({name: key, hours: 200})
        }       
      }
      return employees;
    } catch (error) {
      console.error(error);
    }
}
