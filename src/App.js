import React from 'react';
import './App.css';
import Dashboard from './Dashboard';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customerPage:[]
        }
    }

    componentWillMount(){
        var customerPage =[];
        customerPage.push(<Dashboard appContext={this}/>);
        this.setState({customerPage: customerPage})
    }
    
    render() {
        return (
            <div>
                {this.state.customerPage}
            </div>
        );
    }
}

export default App;