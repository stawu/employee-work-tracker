import React from "react";
import {
    Fab
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/PersonAdd"
import AddEmployeeDialog from "./addEmployeeDialog";
import axios from "axios";
import EmployeesTable from "./employeesTable";
import html2canvas from "html2canvas";
import QrCodes from "../qrCodes";
import { jsPDF } from "jspdf";

class EmployeesPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            employeeDialogOpen: false,
            employees: [],
            employeesQr: []
        };

        this.toggleEmployeeDialog = this.toggleEmployeeDialog.bind(this);
        this.getEmployees = this.getEmployees.bind(this);
        this.onAddEmployeeDialogClose = this.onAddEmployeeDialogClose.bind(this);
        this.onGenerateQrCode = this.onGenerateQrCode.bind(this);
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

    onGenerateQrCode(employeesIds){
        this.setState(prevState => ({
            employeesQr: prevState.employees.filter(employee => employeesIds.includes(employee.id))
        }), () => {
            html2canvas(document.getElementById("hidden_qr"), {scale: 1}).then(canvas => {
                const doc = new jsPDF();
                const imgData = canvas.toDataURL('image/png');
                doc.addImage(imgData, 'PNG', 10, 10);
                doc.save("qr.pdf");
            });
        });
    }


    render() {
        return (
            <div>
                <div>
                    <EmployeesTable employees={this.state.employees} onEmployeesChanged={this.getEmployees} onGenerateQrCode={this.onGenerateQrCode} />
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

                <div id="hidden_qr" style={{
                    position: "fixed",
                    top: "100%"
                }}>
                    <QrCodes employees={this.state.employeesQr}/>
                </div>
            </div>
        );
    }
}

export default EmployeesPage;