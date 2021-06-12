import React from "react";
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Tab,
    Tabs,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";

class AddEmployeeDialog extends React.Component {

    defaultState = {
        inputErrors: {
            name: false,
            nameHelperText: '',
            lastName: false,
            lastNameHelperText: '',
        },
        addingEmployee: false
    };

    employee = {}

    defaultEmployee = {
        name: '',
        lastName: ''
    }

    constructor(props) {
        super(props);

        this.state = {}
        Object.assign(this.state, this.defaultState)
        Object.assign(this.employee, this.defaultEmployee)

        this.resetState = this.resetState.bind(this)
        this.handleAddEmployeeDialogClose = this.handleAddEmployeeDialogClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddButton = this.handleAddButton.bind(this);
        this.validateEmployeeValue = this.validateEmployeeValue.bind(this);
        this.employeeValuesCorrect = this.employeeValuesCorrect.bind(this);
    }

    resetState(){
        Object.assign(this.employee, this.defaultEmployee)
        this.setState(this.defaultState);
    }

    handleAddEmployeeDialogClose(){
        this.resetState();
        this.props.onClose();
    }

    handleInputChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.employee[name] = value;

        this.validateEmployeeValue(name);
    }

    validateEmployeeValue(valueName){
        let inputErrors = {};
        Object.assign(inputErrors, this.state.inputErrors);
        let valid = false;

        if(this.employee[valueName] === '') {
            inputErrors[valueName] = true;
            inputErrors[valueName + 'HelperText'] = 'Pole nie może być puste!';
        }
        else if(!this.employee[valueName].match('^[-a-zA-Z0-9-()]+(\\s+[-a-zA-Z0-9-()]+)*$')){
            inputErrors[valueName] = true;
            inputErrors[valueName + 'HelperText'] = 'Pole zawiera niedozwolone znaki!';
        }
        else{
            inputErrors[valueName] = false;
            inputErrors[valueName + 'HelperText'] = '';
            valid = true;
        }

        this.setState({inputErrors: inputErrors});
        return valid;
    }

    employeeValuesCorrect(){
        return this.validateEmployeeValue('name') && this.validateEmployeeValue('lastName');
    }

    async handleAddButton() {
        console.log(this.employee.name + " " + this.employee.lastName);

        if (this.employeeValuesCorrect()) {
            this.setState({addingEmployee: true});
            await axios.post('/api/employees', this.employee);
            await new Promise(r => setTimeout(r, 1000));
            this.handleAddEmployeeDialogClose();
        }
    }


    render() {
        return (
            <Dialog open={this.props.open} maxWidth="xl">
                <DialogTitle>Dodaj pracownika</DialogTitle>

                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Tabs variant="scrollable" scrollButtons="auto">
                                <Tab label="Podstawowe" />
                                <Tab label="Rejestracja czasu pracy" disabled />
                                <Tab label="Grafik pracy" disabled />
                                <Tab label="Urlopy" disabled />
                                <Tab label="Uprawnienia" disabled />
                                <Tab label="Zaawansowane" disabled />
                            </Tabs>
                        </Grid>

                        <Grid item sm={12} md={6}>
                            <TextField label="Imię" variant="outlined" required fullWidth
                                       name="name"
                                       onChange={this.handleInputChange}
                                       error={this.state.inputErrors.name}
                                       helperText={this.state.inputErrors.nameHelperText}
                            />
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <TextField label="Nazwisko" variant="outlined" required fullWidth
                                       name="lastName"
                                       onChange={this.handleInputChange}
                                       error={this.state.inputErrors.lastName}
                                       helperText={this.state.inputErrors.lastNameHelperText}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleAddEmployeeDialogClose} color="primary">
                        Anuluj
                    </Button>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            position: 'relative'
                        }}>
                            <Button onClick={this.handleAddButton} color="primary"
                                    disabled={this.state.addingEmployee}>
                                Dodaj
                            </Button>
                            {this.state.addingEmployee && <CircularProgress size={24} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: -12,
                                marginLeft: -12
                            }} />}
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        );
    }
}

export default AddEmployeeDialog;