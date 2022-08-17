import React from 'react';


class SearchResults extends React.Component {
    render() {
        return(
            <div className="search-result">
                <p key={this.props.num}>{`${this.props.firstname} ${this.props.lastname}`}</p>
            </div>
        )
    }
}

export default SearchResults;