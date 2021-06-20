import {
    Button, Checkbox,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Toolbar, Tooltip
} from "@material-ui/core";
import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {idID} from "@material-ui/core/locale";
import Typography from "@material-ui/core/Typography";
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import QrCodes from "../qrCodes";
import html2canvas from "html2canvas";

class EmployeesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mouseOverEntityId: null,
            deleteDialogOpen: false,
            employeeToRemove: null,
            selectedEmployees: []
        };

        this.onDialogDeleteEmployeeButtonClicked = this.onDialogDeleteEmployeeButtonClicked.bind(this);
        this.onMouseEnterRow = this.onMouseEnterRow.bind(this);
        this.onMouseExitRow = this.onMouseExitRow.bind(this);
        this.onRowClicked = this.onRowClicked.bind(this);
        this.openDeleteDialog = this.openDeleteDialog.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
        this.toggleAllEmployeesSelection = this.toggleAllEmployeesSelection.bind(this);
    }

    onMouseEnterRow(employeeId) {
        this.setState({
            mouseOverEntityId: employeeId
        });
    }

    onMouseExitRow(employeeId) {
        this.setState(prevState => ({
            mouseOverEntityId: prevState.mouseOverEntityId === employeeId ? null : prevState.mouseOverEntityId
        }));
    }

    onRowClicked(employeeId) {
        this.setState(prevState => ({
            selectedEmployees: prevState.selectedEmployees.includes(employeeId) ?
                prevState.selectedEmployees.filter(e => e !== employeeId) :
                prevState.selectedEmployees.concat(employeeId)
        }));
    }

    openDeleteDialog(employee) {
        this.setState({
            deleteDialogOpen: true,
            employeeToRemove: employee
        });
    }

    closeDeleteDialog() {
        this.setState({
            deleteDialogOpen: true,
            employeeToRemove: null
        });
    }

    async onDialogDeleteEmployeeButtonClicked() {
        await axios.delete("/api/employees/" + this.state.employeeToRemove.id);
        await this.props.onEmployeesChanged();
        this.closeDeleteDialog();
    }

    toggleAllEmployeesSelection(){
        this.setState(previousState => ({
            selectedEmployees: previousState.selectedEmployees.length === this.props.employees.length ?
                [] :
                this.props.employees.map(employee => employee.id)
        }));
    }

    render() {
        return (
            <Paper>
                <Toolbar style={this.state.selectedEmployees.length > 0 ? {
                    background: "rgba(245, 0, 57, 0.59)"
                } : {}}>
                    {
                        this.state.selectedEmployees.length > 0 ?
                            <>
                                <Typography variant="subtitle1" style={{flex: "1 1 100%"}}>
                                    { "Wybrano: " + this.state.selectedEmployees.length + " pracowników" }
                                </Typography>
                                <Tooltip title="Wygeneruj kody QR">
                                    <Button color="default" variant="contained" startIcon={<CenterFocusWeakIcon />} size="small" onClick={ () => this.props.onGenerateQrCode(this.state.selectedEmployees) }>
                                        QR
                                    </Button>
                                </Tooltip>
                            </>
                        :
                            <Typography variant="h6">
                            Pracownicy
                            </Typography>
                    }
                </Toolbar>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={this.state.selectedEmployees.length > 0 && this.state.selectedEmployees.length < this.props.employees.length}
                                        checked={this.state.selectedEmployees.length > 0} onClick={this.toggleAllEmployeesSelection}/>
                                </TableCell>
                                <TableCell>
                                    Imię
                                </TableCell>
                                <TableCell>
                                    Nazwisko
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.employees.map(employee => {
                                const isEmployeeSelected = this.state.selectedEmployees.includes(employee.id);

                                return (
                                    <TableRow hover
                                              onMouseEnter={ () => this.onMouseEnterRow(employee.id) }
                                              onMouseLeave={ () => this.onMouseExitRow(employee.id) }
                                              onClick={ () => this.onRowClicked(employee.id) }
                                              selected={isEmployeeSelected}>
                                        <TableCell padding="checkbox">
                                            <Checkbox checked={isEmployeeSelected}/>
                                        </TableCell>
                                        <TableCell>
                                            {employee.name}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{
                                                position: "relative",
                                                height: "30px",
                                                verticalAlign: "center"
                                            }}>
                                                {employee.lastName}

                                                {employee.id === this.state.mouseOverEntityId &&
                                                    <div style={{
                                                        position: "absolute",
                                                        textAlign: "right",
                                                        right: 0,
                                                        top: 0
                                                    }}>
                                                        <Button variant="contained" color="secondary" size="small"
                                                                startIcon={<DeleteIcon/>}
                                                                onClick={() => {this.openDeleteDialog(employee)}}>
                                                            Usuń
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                { this.state.employeeToRemove !== null &&
                    <Dialog open={this.state.deleteDialogOpen}>
                        <DialogTitle>
                            {"Czy na pewno chcesz usunąć: " + this.state.employeeToRemove.name + " " + this.state.employeeToRemove.lastName + "?"}
                        </DialogTitle>

                        <DialogContent>
                            <DialogContentText>
                                Uwaga! Usuwając pracownika nie będziesz miał możliwości jego przywrócenia. Skasowana
                                zostanie również cała dotychczasowa historia pracy.
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button color="primary" onClick={() => this.closeDeleteDialog()}>
                                Anuluj
                            </Button>

                            <Button color="secondary" startIcon={<DeleteIcon/>}
                                    onClick={() => this.onDialogDeleteEmployeeButtonClicked()}>
                                USUŃ
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </Paper>
        );
    }
}

export default EmployeesTable;