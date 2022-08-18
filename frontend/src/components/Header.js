import React from "react";
import ResultContainer from "./ResultsContainer";
class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            searchResults:[],
            isResultsVisible:false,
        };
        this.Search = this.Search.bind(this);
    }

    Search(e) {
        const req = {
            value: e.target.value
        }
        
        fetch("http://localhost:3001/Search",{
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(req)
        })
        .then(response => response.json())
        .then(body => {
            if (e.target.value.length > 0) {
                this.setState({searchResults:body})
                this.setState({isResultsVisible:true})
            }
            else {
                this.setState({searchResults:[]})
                this.setState({isResultsVisible:false})
            } 
        })
        }

    render() {
        return (
            <div className="header-wrapper">
                <div className="header">
                    <input type="text" className="search-box" placeholder="Search..." onKeyUp={this.Search}></input>
                    <button className="logout-button" onClick={this.props.btn}>Log out</button>
                </div>
                {this.state.isResultsVisible ? <ResultContainer recommendations={this.state.searchResults}/> : null}
            </div>
            
            
        )
    }
}

export default Header;