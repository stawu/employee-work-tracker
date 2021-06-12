import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";
import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {idID} from "@material-ui/core/locale";

class EmployeesTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            mouseOverEntityId: null,
            deleteDialogOpen: false,
            employeeToRemove: null
        };

        this.onDialogDeleteEmployeeButtonClicked = this.onDialogDeleteEmployeeButtonClicked.bind(this);
        this.onMouseEnterRow = this.onMouseEnterRow.bind(this);
        this.onMouseExitRow = this.onMouseExitRow.bind(this);
        this.openDeleteDialog = this.openDeleteDialog.bind(this);
        this.closeDeleteDialog = this.closeDeleteDialog.bind(this);
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

    render() {
        return (
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
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
                                return (
                                    <TableRow hover
                                              onMouseEnter={ () => this.onMouseEnterRow(employee.id) }
                                              onMouseLeave={ () => this.onMouseExitRow(employee.id) }>
                                        <TableCell width={6}>
                                            {employee.name}
                                        </TableCell>
                                        <TableCell width={6}>
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