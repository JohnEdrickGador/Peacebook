import React from 'react';
import SearchResults from './SearchResults';

class ResultContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendations: this.props.recommendations,
        };
    }

    render() {
        return(
            <div className='results-container'>
                {
                    this.state.recommendations.map((person,i) => {
                        return <SearchResults key={i} firstname={person.firstname} lastname={person.lastname}/>  
                   })
                }
            </div>
        )
    }
}

export default ResultContainer;