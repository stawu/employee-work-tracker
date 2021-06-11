import React from "react";
import {
    Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/PersonAdd"
import AddEmployeeDialog from "./employeesPage/addEmployeeDialog";
import axios from "axios";
import EmployeesTable from "./employeesPage/employeesTable";

class EmployeesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeDialogOpen: false,
            employees: []
        };

        this.toggleEmployeeDialog = this.toggleEmployeeDialog.bind(this);
        this.getEmployees = this.getEmployees.bind(this);
        this.onAddEmployeeDialogClose = this.onAddEmployeeDialogClose.bind(this);
    }

    componentDidMount() {
        this.getEmployees();
    }

    onAddEmployeeDialogClose(){
        this.toggleEmployeeDialog();
        this.getEmployees();
    }

    toggleEmployeeDialog(){
        this.setState(prevState => { return {
            employeeDialogOpen: !prevState.employeeDialogOpen
        }});
    }

    async getEmployees(){
        const employees = await axios.get('/api/employees');
        this.setState({employees: employees.data})
        console.log(this.state.employees);
    }


    render() {
        return (
            <div>
                <div>
                    <EmployeesTable employees={this.state.employees} />
                    <Fab variant="extended" onClick={this.toggleEmployeeDialog}
                         style={{
                             float: 'right',
                             marginTop: '10px'
                         }}>
                        <AddIcon />
                        Dodaj pracownika
                    </Fab>
                </div>

                <AddEmployeeDialog open={this.state.employeeDialogOpen} onClose={this.onAddEmployeeDialogClose} />
            </div>
        );
    }
}

export default EmployeesPage;