import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faChartBar,
  faCog,
  faEdit,
  faUserFriends
} from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";
import SignInModal from "./SignInModal";
import SignOutModal from "./SignOutModal";
import Api from "../Api";

// Import FontAwesome stuff
library.add(fab, faChartBar, faCog, faEdit, faUserFriends);

class App extends Component {
  constructor(props) {
    super(props);

    this.Api = new Api(process.env.REACT_APP_FOOSKILL_API_URL);

    this.state = {
      loggedIn: localStorage.getItem("token") ? true : false,
      players: null,
      signInModalShow: false,
      signOutModalShow: false,
      user: null
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);
    this.setLoggedOut = this.setLoggedOut.bind(this);
    this.setUserFromToken = this.setUserFromToken.bind(this);
  }

  handleSignIn = async (e, data) => {
    e.preventDefault();

    // TODO some error catching here if login no good
    let tokenJson = await this.Api.getApiTokenWithBasicAuth(data);
    this.setLoggedIn(tokenJson.token);
  };

  handleSignOut = async e => {
    e.preventDefault();
    this.setLoggedOut();
  };

  setLoggedIn = async token => {
    localStorage.setItem("token", token);
    this.Api.setToken(token);
    let user = await this.Api.getUserFromApiToken();
    this.setState({ logged_in: true, user: user });
  };

  setLoggedOut = () => {
    localStorage.removeItem("token");
    this.Api.setToken(null);
    this.setState({ logged_in: false, user: null });
  };

  setUserFromToken = token => {};

  async componentDidMount() {
    // Fetch list of players from API
    let players = await this.Api.getActivePlayers();
    this.setState({ players });

    // If logged in, get user info and give the token to the Api class
    if (this.state.loggedIn) {
      this.setLoggedIn(localStorage.getItem("token"));
    }
  }

  render() {
    // Modal parameters
    let signInModalOpen = () => this.setState({ signInModalShow: true });
    let signOutModalOpen = () => this.setState({ signOutModalShow: true });
    let signInModalClose = () => this.setState({ signInModalShow: false });
    let signOutModalClose = () => this.setState({ signOutModalShow: false });

    // Make sure we have the basics loaded
    if (!this.state.players || (this.state.loggedIn && !this.state.user)) {
      return null;
    }

    return (
      <div className="App">
        <SignInModal
          show={this.state.signInModalShow}
          onHide={signInModalClose}
          handleSubmit={this.handleSignIn}
        />
        <SignOutModal
          show={this.state.signOutModalShow}
          onHide={signOutModalClose}
          handleSubmit={this.handleSignOut}
        />

        <Navbar
          loggedIn={this.state.loggedIn}
          user={this.state.user}
          signInHandle={signInModalOpen}
          signOutHandle={signOutModalOpen}
        />

        <br />

        <Container>
          <Row>
            <Col md={5}>
              <Leaderboard players={this.state.players} />
            </Col>
            <Col>
              <h4>STUFF HERE</h4>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
