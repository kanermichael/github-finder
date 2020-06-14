import React from "react";
import axios from "axios";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import About from "./components/Pages/About";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const res = await axios.get(`https://api.github.com/users`, {
  //     headers: {
  //       Authorization: process.env.REACT_APP_GITHUB_TOKEN,
  //     },
  //   });

  //   this.setState({ users: res.data, loading: false });
  // }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_GITHUB_TOKEN,
        },
      }
    );

    this.setState({ users: res.data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [] });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { users, loading, alert } = this.state;
    return (
      <Router>
        <Navbar title="Github Finder" icon="fab fa-github" />
        <div className="container">
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <Alert alert={alert} />
                <Search
                  searchUsers={this.searchUsers}
                  clearUsers={this.clearUsers}
                  showClear={users.length > 0 ? true : false}
                  setAlert={this.setAlert}
                />
                <Users loading={loading} users={users} />
              </React.Fragment>
            )}
          />
          <Route exact path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
