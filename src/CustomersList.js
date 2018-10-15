import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { rgbToHex } from '@material-ui/core/styles/colorManipulator';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import UpdateIcon from '@material-ui/icons/Update';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: rgbToHex('#D81E05'),
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
        },
    },
    createbutton: {
        margin: theme.spacing.unit * 2,
        float: 'left',
    },
    button: {
        margin: theme.spacing.unit * 2,
        float: 'right',
    },
    tableHead: {
        fontSize: 'large',
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit,
    },
});
  
function getModalStyle() {
    const top = 50;
    const left = 55;
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const apiBaseUrl = "https://bootrestcurdapp.cfapps.io/bootRestCURDApp";

class CustomersList extends React.Component {
    state = {
        customers: [],
        custID: null,
        checked: null,
        viewOpen: false,
        fname:'',
        lname:'',
        email:'',
        mobile:'',
        city:'',
        state: '',
        country:'',
        pincode:'',
        deleteOpen: false,
        editOpen: false,
        updateOpen: false,
        custName: null
    }

    componentDidMount() {
        axios.get(apiBaseUrl+'/get').then(response => {
            if(response.status === 200) {
                const customers = response.data;
                this.setState({ customers });
                console.log("Customer Array Data is :: " + this.state.customers.length);
            } else{
                console.log("Something Went Wrong Fetching Customers :: " + response.status);
            }
        }).catch(error => {
            console.log("Error Occured in All Customers Page :: " + error);
        })
    }

    handleViewOpen = () => {
        axios.get(apiBaseUrl+'/get/'+this.state.custID).then(response => {
            if(response.status === 200) {
                const customer = response.data;
                console.log("Customer :: " + this.state.custID +" :: Data is :: " + customer.email);
                this.setState({ fname: customer.fname});
                this.setState({ lname: customer.lname});
                this.setState({ email: customer.email});
                this.setState({ mobile: customer.mobile});
                this.setState({ city: customer.city});
                this.setState({ state: customer.state});
                this.setState({ country: customer.country});
                this.setState({ pincode: customer.pincode});
                this.setState({ viewOpen: true });
                console.log("Customer Mobile Number is :: " + this.state.mobile);
            } else{
                console.log("Something Went Wrong Showing Customer Details :: " + response.status);
            }
        }).catch(error => {
            console.log("Error Occured in View Customers Page :: " + error);
        })
    };
    
    handleViewClose = () => {
        this.setState({ viewOpen: false });
    };

    handleEditOpen = () => {
        axios.get(apiBaseUrl+'/get/'+this.state.custID).then(response => {
            if(response.status === 200) {
                const customer = response.data;
                console.log("Customer :: " + this.state.custID +" :: Data is :: " + customer.email);
                this.setState({ fname: customer.fname});
                this.setState({ lname: customer.lname});
                this.setState({ email: customer.email});
                this.setState({ mobile: customer.mobile});
                this.setState({ city: customer.city});
                this.setState({ state: customer.state});
                this.setState({ country: customer.country});
                this.setState({ pincode: customer.pincode});
                this.setState({ editOpen: true });
                console.log("Customer Mobile Number is :: " + this.state.mobile);
            } else{
                console.log("Something Went Wrong Editing Customer Details :: " + response.status);
            }
        }).catch(error => {
            console.log("Error Occured in View Customers Page :: " + error);
        })
    };

    handleEditClose = () => {
        this.setState({ editOpen: false });
    };

    handleDeleteOpen = () => {
        axios.delete(apiBaseUrl+'/delete/'+this.state.custID).then(response => {
            if(response.status === 200) {
                const status = response.data;
                console.log("Deleted Customer Status is :: " + status);
                this.setState({ deleteOpen: true });
            } else{
                console.log("Something Went Wrong Deleting Customer Details :: " + response.status);
            }
        }).catch(error => {
            console.log("Error Occured in Delete Customers Page :: " + error);
        })
    };

    handleDeleteClose = () => {
        this.setState({ deleteOpen: false });
        window.location.reload(true);
    };

    handleChange = (id, name) => event => {
        const checked = event.target.checked;
        const custID = id;
        const custName = name;
        this.setState({ checked });
        this.setState({ custID });
        this.setState({ custName });
        console.log("Checked Boolean is :: " + checked);
        console.log("Selected Customer ID is :: " + custID);
        console.log("Selected Customer Name is :: " + custName);
    };

    handleClick(event) {
        if(this.state.fname.length > 0 && this.state.lname.length > 0 && this.state.email.length > 0 
            && this.state.mobile.length > 0 && this.state.city.length > 0 && this.state.state.length > 0
            && this.state.country.length > 0 && this.state.pincode.length > 0) {
            var CustomerDetails = JSON.stringify({
                "fname" : this.state.fname,
                "lname" : this.state.lname,
                "email" : this.state.email,
                "mobile" : this.state.mobile,
                "city" : this.state.city,
                "state" : this.state.state,
                "country" : this.state.country,
                "pincode" : this.state.pincode
            })
            axios.put(apiBaseUrl+'/put/'+this.state.custID, CustomerDetails , { headers: { 'Content-Type': 'application/json' } }).then(response => {             
                if(response.status === 200) {
                    console.log("Customer Updation Respose Data is :: " + response.data);
                    console.log("Customer Updated Successfully of Email ID :: " + this.state.email);
                    this.setState({ updateOpen: true });
                } else{
                    console.log("Something Went Wrong While Updating Customer Details :: " + response.status);
                }
            }).catch(error => {
                console.log("Error Occred While Customer Updation" + error);
            });
        } else{
            alert("Please provide all Input field values");
        }
    }

    handleUpdateClose = () => {
        this.setState({ editOpen: false });
        this.setState({ updateOpen: false });
        window.location.reload(true);
    };
 
    render() {
        const { classes } = this.props;
        return( 
            <Paper className={classes.root}>
                <h1>List of Customers</h1>
                <Tooltip title="Add" placement="top">
                    <Button disabled variant="fab" color="primary" aria-label="Add" className={classes.createbutton} >
                        <AddIcon />
                    </Button>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                    <Button disabled={!this.state.checked} onClick={this.handleDeleteOpen} variant="fab" color="primary" aria-label="Delete" className={classes.button}>
                        <DeleteIcon />
                    </Button>
                </Tooltip>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.deleteOpen} onClose={this.handleDeleteClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            <h4>Selected Customer "{this.state.custName}" Details are Removed.</h4>
                        </Typography>
                    </div>
                </Modal>
                <Tooltip title="Edit" placement="top">
                    <Button disabled={!this.state.checked} onClick={this.handleEditOpen} variant="fab" color="primary" aria-label="Edit" className={classes.button}>
                        <EditIcon />
                    </Button>
                </Tooltip>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.editOpen} onClose={this.handleEditClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="subheading" id="simple-modal-description">
                            <h1>Edit Selected Customer</h1>
                            <MuiThemeProvider>
                                <div>
                                    <TextField hintText="Enter your First Name" floatingLabelText="First Name" value={this.state.fname} onChange={(event, newValue) => this.setState({fname:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <TextField hintText="Enter your Last Name" floatingLabelText="Last Name" value={this.state.lname} onChange={(event, newValue) => this.setState({lname:newValue})} /> <br/>
                                    <TextField hintText="Enter your Email Id" floatingLabelText="Email Id" value={this.state.email} onChange={(event, newValue) => this.setState({email:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <TextField hintText="Enter your Mobile Number" floatingLabelText="Mobile Number" value={this.state.mobile} onChange={(event, newValue) => this.setState({mobile:newValue})} /> <br/>
                                    <TextField hintText="Enter your City" floatingLabelText="City" value={this.state.city} onChange={(event, newValue) => this.setState({city:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <TextField hintText="Enter your State" floatingLabelText="State" value={this.state.state} onChange={(event, newValue) => this.setState({state:newValue})} /> <br/>
                                    <TextField hintText="Enter your Country" floatingLabelText="Country" value={this.state.country} onChange={(event, newValue) => this.setState({country:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <TextField hintText="Enter your Pincode" floatingLabelText="Pincode" value={this.state.pincode} onChange={(event, newValue) => this.setState({pincode:newValue})} /> <br/>
                                    <Button type="submit" variant="extendedFab" color="secondary" aria-label="Edit" style={style}  onClick={(event) => this.handleClick(event)}>
                                        <UpdateIcon className={classes.extendedIcon} />Update
                                    </Button>
                                    <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.updateOpen} onClose={this.handleUpdateClose}>
                                        <div style={getModalStyle()} className={classes.paper}>
                                            <Typography variant="title" id="modal-title">
                                                <h4>Customer "{this.state.fname}&nbsp;&nbsp;{this.state.lname}" was Updated Successfully..!</h4>
                                            </Typography>
                                        </div>
                                    </Modal>
                                </div>
                            </MuiThemeProvider>
                        </Typography>
                    </div>
                </Modal>
                <Tooltip title="View" placement="top">
                    <Button disabled={!this.state.checked} onClick={this.handleViewOpen} variant="fab" color="primary" aria-label="View" className={classes.button}>
                        <VisibilityIcon />
                    </Button>
                </Tooltip>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.viewOpen} onClose={this.handleViewClose}>
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="subheading" id="simple-modal-description">
                            <Table className={classes.table} >
                                <TableHead>
                                    <TableRow>
                                        <CustomTableCell colspan="2" className={classes.tableHead} style="text-align: center">Selected Customer Details</CustomTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <CustomTableCell>Name</CustomTableCell>
                                        <CustomTableCell>{this.state.fname} {this.state.lname}</CustomTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <CustomTableCell>Email ID</CustomTableCell>
                                        <CustomTableCell>{this.state.email}</CustomTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <CustomTableCell>Mobile</CustomTableCell>
                                        <CustomTableCell>{this.state.mobile}</CustomTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <CustomTableCell>City</CustomTableCell>
                                        <CustomTableCell>{this.state.city}</CustomTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <CustomTableCell>State</CustomTableCell>
                                        <CustomTableCell>{this.state.state}</CustomTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <CustomTableCell>Country</CustomTableCell>
                                        <CustomTableCell>{this.state.country}</CustomTableCell>
                                    </TableRow>
                                    <TableRow>
                                        <CustomTableCell>Pincode</CustomTableCell>
                                        <CustomTableCell>{this.state.pincode}</CustomTableCell>
                                    </TableRow>  
                                </TableBody>
                            </Table>
                        </Typography>
                    </div>
                </Modal>
                <Table className={classes.table} >
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>&nbsp;&nbsp;Select</CustomTableCell>
                            <CustomTableCell>Name</CustomTableCell>
                            <CustomTableCell>Email ID</CustomTableCell>
                            <CustomTableCell>Mobile</CustomTableCell>
                            <CustomTableCell>City</CustomTableCell>
                            <CustomTableCell>State</CustomTableCell>
                            <CustomTableCell>Country</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.customers.map(customer => { return (
                            <TableRow className={classes.customer} key={customer._id}>
                                <CustomTableCell>
                                    <Radio checked={this.state.custID === customer._id} onChange={this.handleChange(customer._id, customer.fname+ " " +customer.lname)} />
                                </CustomTableCell>
                                <CustomTableCell component="th" scope="row">{customer.fname} {customer.lname}</CustomTableCell>
                                <CustomTableCell component="th" scope="row">{customer.email}</CustomTableCell>
                                <CustomTableCell component="th" scope="row">{customer.mobile}</CustomTableCell>
                                <CustomTableCell component="th" scope="row">{customer.city}</CustomTableCell>
                                <CustomTableCell component="th" scope="row">{customer.state}</CustomTableCell>
                                <CustomTableCell component="th" scope="row">{customer.country}</CustomTableCell>
                            </TableRow>
                            );
                        })}      
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

CustomersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const style = {
  margin: 20,
};

export default withStyles(styles)(CustomersList);