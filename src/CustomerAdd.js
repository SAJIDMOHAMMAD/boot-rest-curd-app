import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
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

class CustomerAdd extends React.Component {
    state = {
        fname:'',
        lname:'',
        email:'',
        mobile:'',
        city:'',
        state: '',
        country:'',
        pincode:'',
        open: false,
        custName: ''
    }

    handleClose = () => {
        this.setState({ open: false });
        window.location.reload(true);
    };

    handleClick(event) {
        var apiBaseUrl = "https://bootrestcurdapp.cfapps.io/bootRestCURDApp";
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
            axios.post(apiBaseUrl+'/post', CustomerDetails , { headers: { 'Content-Type': 'application/json' } }).then(response => {
                console.log("Customer Creation Respose Data is :: " + response.data);
                if(response.status === 200) {
                    console.log("Customer Added Successfully with Email ID :: " + response.data.email);
                    this.setState({ custName:  response.data.fname + "  " + response.data.lname});
                    this.setState({ open: true });
                } else{
                    console.log("Something Went Wrong While Customer Registration :: " + response.status);
                }
            }).catch(error => {
                console.log("Error Occred While Customer Registration" + error);
            });
        } else{
            alert("Please provide all Input field values");
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <h1>Add New Customer</h1>
                <MuiThemeProvider>
                    <div>
                        <TextField hintText="Enter your First Name" floatingLabelText="First Name" onChange={(event, newValue) => this.setState({fname:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField hintText="Enter your Last Name" floatingLabelText="Last Name" onChange={(event, newValue) => this.setState({lname:newValue})} /> <br/>
                        <TextField hintText="Enter your Email Id" floatingLabelText="Email Id" onChange={(event, newValue) => this.setState({email:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField hintText="Enter your Mobile Number" floatingLabelText="Mobile Number" maxlength="10" onChange={(event, newValue) => this.setState({mobile:newValue})} /> <br/>
                        <TextField hintText="Enter your City" floatingLabelText="City" onChange={(event, newValue) => this.setState({city:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField hintText="Enter your State" floatingLabelText="State" onChange={(event, newValue) => this.setState({state:newValue})} /> <br/>
                        <TextField hintText="Enter your Country" floatingLabelText="Country" onChange={(event, newValue) => this.setState({country:newValue})} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField hintText="Enter your Pincode" floatingLabelText="Pincode" maxlength="6" onChange={(event, newValue) => this.setState({pincode:newValue})} /> <br/>
                        <Button type="submit" variant="extendedFab" color="secondary" aria-label="Add" style={style}  onClick={(event) => this.handleClick(event)}>
                            <SaveIcon className={classes.extendedIcon} />Save
                        </Button>
                        <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={this.state.open} onClose={this.handleClose}>
                            <div style={getModalStyle()} className={classes.paper}>
                                <Typography variant="title" id="modal-title">
                                    <h4>Customer "{this.state.custName}" was Created Successfully..!</h4>
                                </Typography>
                            </div>
                        </Modal>
                    </div>
                </MuiThemeProvider>
            </Paper>
        );
    }
}

CustomerAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

const style = {
  margin: 20,
};

export default withStyles(styles)(CustomerAdd);