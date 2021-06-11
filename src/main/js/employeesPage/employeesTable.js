import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import React from "react";

class EmployeesTable extends React.Component {

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
                                    <TableRow hover>
                                        <TableCell>
                                            {employee.name}
                                        </TableCell>
                                        <TableCell>
                                            <div style={{float: 'left'}}>
                                                {employee.lastName}
                                            </div>

                                            {
                                                //this.state.
                                                <div style={{
                                                    textAlign: 'right'
                                                    //position: 'relative',
                                                    //right: '110%'
                                                }}>
                                                    {/*ccc*/}
                                                </div>
                                            }
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
}

export default EmployeesTable;