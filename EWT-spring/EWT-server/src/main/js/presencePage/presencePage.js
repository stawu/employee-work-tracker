import React from "react";
import {
    CircularProgress,
    Grid, IconButton, MenuItem,
    Paper, Popover, Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar, Tooltip
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LeftArrow from "@material-ui/icons/ChevronLeft"
import RightArrow from "@material-ui/icons/ChevronRight"
import Button from "@material-ui/core/Button";
import axios from "axios";
import PresentIcon from '@material-ui/icons/Brightness1';
import ProblemIcon from '@material-ui/icons/Warning';

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

class PresencePage extends React.Component {

    constructor(props) {
        super(props);

        const dateNow = new Date(Date.now());
        console.log(dateNow.toLocaleDateString(undefined, {month: 'long'}));

        const firstDayOfMonthDate = new Date(dateNow.getFullYear(), dateNow.getMonth());
        const lastDayOfMonthDate = new Date(dateNow.getFullYear(), dateNow.getMonth(),
            this.daysInMonth(dateNow.getMonth(), dateNow.getFullYear()));

        this.state = {
            employees: [],
            selectedMonthNumber: dateNow.getMonth(),
            selectedYearNumber: dateNow.getFullYear(),
            selectedDays: this.daysBetween(firstDayOfMonthDate, lastDayOfMonthDate),
            workStatuses: {},
            workDurationsSum: {},
            statusPopOverAnchor: null,
            statusPopOverEmployeeData: null
        }

        this.getEmployees = this.getEmployees.bind(this);
        this.getWorkStatusesOfAllEmployeesBetween = this.getWorkStatusesOfAllEmployeesBetween.bind(this);
        this.getWorkStatusesOfEmployeeBetween = this.getWorkStatusesOfEmployeeBetween.bind(this);
        this.onPreviousMonthClicked = this.onPreviousMonthClicked.bind(this);
        this.onNextMonthClicked = this.onNextMonthClicked.bind(this);
        this.changeDateValue = this.changeDateValue.bind(this);
        this.todayButtonClicked = this.todayButtonClicked.bind(this);
        this.closeStatusPopOver = this.closeStatusPopOver.bind(this);
        this.openStatusPopOverAndUpdateData = this.openStatusPopOverAndUpdateData.bind(this);
    }

    daysBetween(fromDate, toDate){
        const dates = [];
        const fromDate_zeroHour = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
        const toDate_zeroHour = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());

        for (let date = fromDate_zeroHour; date.getTime() <= toDate_zeroHour.getTime(); date.setDate(date.getDate() +1)) {
            dates.push(new Date(date));
        }

        return dates;
    }

    daysInMonth(month, year){
        return new Date(year, month-1, 0).getDate();
    }

    componentDidMount() {
        this.getEmployees().then(()=>{
            const firstDayOfMonthDate = new Date(this.state.selectedYearNumber, this.state.selectedMonthNumber);
            const lastDayOfMonthDate = new Date(this.state.selectedYearNumber, this.state.selectedMonthNumber,
                this.daysInMonth(this.state.selectedMonthNumber, this.state.selectedYearNumber));

            this.getWorkStatusesOfAllEmployeesBetween(firstDayOfMonthDate, lastDayOfMonthDate);
        })
    }

    async getEmployees(){
        const employees = await axios.get('/api/employees');
        this.setState({employees: employees.data})
    }

    async getWorkStatusesOfAllEmployeesBetween(fromDate, toDate){
        return Promise.all(this.state.employees.map(
            employee => this.getWorkStatusesOfEmployeeBetween(employee.id, fromDate, toDate)))
    }

    async getWorkStatusesOfEmployeeBetween(employeeId, fromDate, toDate){
        await new Promise(r => setTimeout(r, random(300, 500)));
        const statusData = await axios.get('/api/employees/' + employeeId + '/work-statuses', {
            params: {
                from: fromDate.toISOString().split('T', 1)[0],
                to: toDate.toISOString().split('T', 1)[0]
            }
        });

        const workDurationsSumData = await axios.get('/api/employees/' + employeeId + '/work-durations/sum-value', {
            params: {
                from: fromDate.toISOString().split('T', 1)[0],
                to: toDate.toISOString().split('T', 1)[0]
            }
        });

        this.setState(prevState => {
            prevState.workStatuses[employeeId.toString()] = statusData.data;
            prevState.workDurationsSum[employeeId.toString()] = workDurationsSumData.data;

            return ({
                workStatuses: prevState.workStatuses
            })
        });
    }

    async onPreviousMonthClicked(){
        const newDate = new Date(this.state.selectedYearNumber, this.state.selectedMonthNumber);
        newDate.setMonth(newDate.getMonth() - 1)

        await this.changeDateValue(newDate.getMonth(), newDate.getFullYear());
    }

    async onNextMonthClicked() {
        const newDate = new Date(this.state.selectedYearNumber, this.state.selectedMonthNumber);
        newDate.setMonth(newDate.getMonth() + 1)

        await this.changeDateValue(newDate.getMonth(), newDate.getFullYear());
    }

    async changeDateValue(newMonthValue, newYearValue){
        const firstDayOfMonthDate = new Date(newYearValue, newMonthValue);
        const lastDayOfMonthDate = new Date(newYearValue, newMonthValue,
            this.daysInMonth(newMonthValue, newYearValue));

        this.setState({
            selectedYearNumber: newYearValue,
            selectedMonthNumber: newMonthValue,
            selectedDays: this.daysBetween(firstDayOfMonthDate, lastDayOfMonthDate),
            workStatuses: {},
            workDurationsSum: {}
        });

        await this.getWorkStatusesOfAllEmployeesBetween(firstDayOfMonthDate, lastDayOfMonthDate);
    }

    async todayButtonClicked(){
        const todayDate = new Date(Date());
        await this.changeDateValue(todayDate.getMonth(), todayDate.getFullYear());
    }

    openStatusPopOverAndUpdateData(eventTarget, employee, workStatus){
        this.setState({
            statusPopOverAnchor: eventTarget,
            statusPopOverEmployeeData: null
        }, async () => {
            await new Promise(r => setTimeout(r, random(300, 500)));
            const workDurationsRes = await axios.get('/api/employees/' + employee.id + '/work-durations/by-date', {
                params: {
                    date: workStatus.date
                }
            });

            this.setState({
                statusPopOverEmployeeData: {
                    employee: employee,
                    workStatus: workStatus,
                    workDurations: workDurationsRes.data
                }
            })
        });
    }

    closeStatusPopOver(){
        this.setState({
            statusPopOverAnchor: null
        });
    }

    render() {
        return (
            <div>
                <Paper>
                    <Toolbar>
                        <Button variant="contained" onClick={this.todayButtonClicked}>
                            Dzisiaj
                        </Button>

                        <Tooltip title="Poprzedn miesiąc">
                            <IconButton onClick={this.onPreviousMonthClicked}>
                                <LeftArrow/>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Kolejny miesiąc">
                            <IconButton onClick={this.onNextMonthClicked}>
                                <RightArrow/>
                            </IconButton>
                        </Tooltip>

                        <Typography variant="h6">
                            {
                                new Date(this.state.selectedYearNumber, this.state.selectedMonthNumber)
                                    .toLocaleDateString(undefined, {
                                        month: "long"
                                    }) +
                                " " +
                                this.state.selectedYearNumber.toString()
                            }
                        </Typography>
                    </Toolbar>

                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                Pracownik
                                            </TableCell>
                                            <TableCell>
                                                Czas pracy
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {
                                            this.state.employees.map(employee =>
                                            <TableRow>
                                                <TableCell>
                                                    {employee.name + " " + employee.lastName}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        (() => {
                                                            const workDurationsSum = this.state.workDurationsSum[employee.id.toString()];
                                                            if (workDurationsSum === undefined)
                                                                return (
                                                                    <CircularProgress size={15}/>
                                                                );
                                                            else {
                                                                return (
                                                                    workDurationsSum.duration
                                                                );
                                                            }
                                                        })()
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        <Grid item xs={9}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            {
                                                this.state.selectedDays.map(dayDate =>
                                                    <TableCell style={{
                                                        border: '1px solid',
                                                        borderColor: 'rgba(174,176,179,0.52)',
                                                        minWidth: '80px',
                                                        fontSize: '12px',
                                                        textAlign: 'center',
                                                        height: '40px',
                                                        padding: '0px'
                                                    }}>
                                                        {dayDate.toLocaleDateString(undefined, {
                                                            weekday: 'short',
                                                            month: 'numeric',
                                                            day: 'numeric'
                                                        })}
                                                    </TableCell>
                                                )
                                            }
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        { this.state.employees.map(employee =>
                                            <TableRow>
                                                {
                                                    this.state.selectedDays.map(dayDate =>
                                                        <TableCell style={{
                                                            textAlign: 'center',
                                                            border: '1px solid',
                                                            borderColor: 'rgba(174,176,179,0.52)',
                                                        }}>
                                                            <div>
                                                            {
                                                                (() => {
                                                                    const statuses = this.state.workStatuses[employee.id.toString()];
                                                                    if(statuses === undefined)
                                                                        return (
                                                                            <CircularProgress size={15}/>
                                                                        );

                                                                    const workStatus = statuses.find(status => Date.parse(status.date + 'T00:00:00.000') === dayDate.getTime());
                                                                    if(workStatus === undefined)
                                                                        return (<div>
                                                                            ?
                                                                        </div>);
                                                                    else if(workStatus.status === 'PRESENT')
                                                                        return (
                                                                            <IconButton onClick={(e) => { this.openStatusPopOverAndUpdateData(e.target, employee, workStatus) } }>
                                                                                <PresentIcon style={{color: '#61a00b'}}/>
                                                                            </IconButton>
                                                                        );
                                                                    else
                                                                        return (
                                                                            <IconButton onClick={(e) => { this.openStatusPopOverAndUpdateData(e.target, employee, workStatus) } }>
                                                                                <ProblemIcon style={{color: '#f5c401'}}/>
                                                                            </IconButton>
                                                                        );
                                                                })()
                                                            }
                                                            </div>
                                                        </TableCell>
                                                    )
                                                }
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Paper>
                
                <Popover
                    open={this.state.statusPopOverAnchor !== null}
                    anchorEl={this.state.statusPopOverAnchor}
                    onClose={this.closeStatusPopOver}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div style={{
                        width: '200px',
                        height: '200px',
                    }}>
                        {this.state.statusPopOverEmployeeData === null ?
                            <div style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <CircularProgress />
                            </div>
                            :
                        <div style={{
                            padding: '15px'
                        }}>
                            <Typography variant="h6">
                                {this.state.statusPopOverEmployeeData.employee.name + ' ' + this.state.statusPopOverEmployeeData.employee.lastName}
                            </Typography>
                            <Typography variant="h6">
                                {this.state.statusPopOverEmployeeData.workStatus.status}
                            </Typography>

                            <Paper>
                                <Typography variant="h6">
                                    Czasy pracy:
                                </Typography>
                                {
                                    this.state.statusPopOverEmployeeData.workDurations.map(workDuration => {
                                        const startDate = new Date(Date.parse(workDuration.startInstant));
                                        const endDate = new Date(Date.parse(workDuration.endInstant));
                                        console.log(endDate)

                                        return (
                                            <div>
                                                {
                                                    startDate.getHours().toString() + ':' + startDate.getMinutes().toString() + ' - '
                                                    + (workDuration.endInstant !== null ?
                                                        (endDate.getHours().toString() + ':' + endDate.getMinutes().toString())
                                                        : '?')
                                                    + (workDuration.duration !== '' ?
                                                        ' (' + workDuration.duration + ')'
                                                        : '')
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </Paper>
                        </div>}
                    </div>
                </Popover>
            </div>
        );
    }
}

export default PresencePage;