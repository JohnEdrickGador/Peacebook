import React from "react";
import SearchResults from "./SearchResults";
class Header extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            searchResults:[]
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
            }
            else {
                this.setState({searchResults:[]})
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
                <div className="results-container">
                    {
                       this.state.searchResults.map((person,i) => {
                            return <SearchResults key={i} firstname={person.firstname} lastname={person.lastname}/>  
                       })
                    }
                </div>
            </div>
            
            
        )
    }
}

export default Header;