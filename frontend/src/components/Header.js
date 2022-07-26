import React from "react";

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <input type="text" className="search-box" placeholder="Search..."></input>
                <button className="logout-button" onClick={this.props.btn}>Log out</button>
            </div>
        )
    }
}

export default Header;