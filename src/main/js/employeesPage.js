import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle, Fab, Grid, Tab, Tabs, TextField} from "@material-ui/core";
import AddIcon from "@material-ui/icons/PersonAdd"
import Button from "@material-ui/core/Button";
import AddEmployeeDialog from "./employeesPage/addEmployeeDialog";

class EmployeesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeDialogOpen: false
        };

        this.toggleEmployeeDialog = this.toggleEmployeeDialog.bind(this);
    }

    toggleEmployeeDialog(){
        this.setState(prevState => { return {
            employeeDialogOpen: !prevState.employeeDialogOpen
        }});
    }


    render() {
        return (
            <div>
                Employee

                <Fab variant="extended" onClick={this.toggleEmployeeDialog}>
                    <AddIcon />
                    Dodaj pracownika
                </Fab>

                <AddEmployeeDialog open={this.state.employeeDialogOpen} onClose={this.toggleEmployeeDialog} />
            </div>
        );
    }
}

export default EmployeesPage;