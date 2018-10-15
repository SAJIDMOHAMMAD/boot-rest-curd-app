import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleIcon from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CustomersList from './CustomersList';
import CustomerAdd from './CustomerAdd';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    divroot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    toolbar: {
        paddingRight: 24,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit,
        height: '100vh',
        overflow: 'auto',
    },
    tableContainer: {
        height: 320,
    },
});

class Dashboard extends React.Component {
    state = {
        open: true,
        selectedIndex: 0,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar position="absolute" style={style} className={classNames(classes.appBar, this.state.open && classes.appBarShift)} >
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen}
                                className={classNames(
                                    classes.menuButton,
                                    this.state.open && classes.menuButtonHidden,
                                )}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" noWrap className={classes.title}>
                                <h2>Spring Boot Rest React Mongo Application</h2>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent"
                        classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose), }}
                        open={this.state.open} >
                        <div className={classes.toolbarIcon}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon style={style}/>
                            </IconButton>
                        </div>
                        <Divider />
                        <Divider />
                        <List>
                            <div className={classes.divroot}>
                                <List component="nav">
                                    <ListItem button style={this.state.selectedIndex === 0 ? style : null} selected={this.state.selectedIndex === 0} onClick={event => this.handleListItemClick(event, 0)}>
                                        <ListItemIcon>
                                            <PeopleIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="All Customers">
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem button style={this.state.selectedIndex === 1 ? style : null} selected={this.state.selectedIndex === 1} onClick={event => this.handleListItemClick(event, 1)} >
                                        <ListItemIcon>
                                            <AddIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Add Customer" >
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem disabled button style={this.state.selectedIndex === 2 ? style : null} selected={this.state.selectedIndex === 2} onClick={event => this.handleListItemClick(event, 2)} >
                                        <ListItemIcon>
                                            <VisibilityIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="View Customer" >
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem disabled button style={this.state.selectedIndex === 3 ? style : null} selected={this.state.selectedIndex === 3} onClick={event => this.handleListItemClick(event, 3)} >
                                        <ListItemIcon>
                                            <EditIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Edit Customer" >
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem disabled button style={this.state.selectedIndex === 4 ? style : null} selected={this.state.selectedIndex === 4} onClick={event => this.handleListItemClick(event, 4)} >
                                        <ListItemIcon>
                                            <DeleteIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Delete Customer" >
                                        </ListItemText>
                                    </ListItem>
                                </List>
                            </div>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <div className={classes.tableContainer}>
                            <div style={{display: this.state.selectedIndex === 0 ? 'block' : 'none' }} >
                                <CustomersList />
                            </div>
                            <div style={{display: this.state.selectedIndex === 1 ? 'block' : 'none' }} >
                                <CustomerAdd />
                            </div>
                            {/* <div style={{display: this.state.selectedIndex === 2 ? 'block' : 'none' }} >
                                <AllCustomers />
                            </div>
                            <div style={{display: this.state.selectedIndex === 3 ? 'block' : 'none' }} >
                                <AllCustomers />
                            </div>
                            <div style={{display: this.state.selectedIndex === 4 ? 'block' : 'none' }} >
                                <AllCustomers />
                            </div> */}
                        </div>
                    </main>
                </div>
            </React.Fragment>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const style = {
    color: '#fff',
    background: '#D81E05',
};

export default withStyles(styles)(Dashboard);