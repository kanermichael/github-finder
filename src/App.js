import React from "react";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    console.log(process.env.REACT_GITHUB_CLIENT_ID);
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
