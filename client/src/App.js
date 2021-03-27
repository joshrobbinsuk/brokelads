import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";

import { AppProvider } from "./contexts/context";
import { NotificationProvider } from "./contexts/notificationContext";
import { AuthProvider } from "./contexts/authContext";
import { theme } from "./contexts/theme";
import Notification from "./components/Notification";
import Header from "./components/Header";

import BetHistory from "./pages/BetHistory";
import Fixtures from "./pages/Fixtures";
import Leaderboard from "./pages/Leaderboard";
import Logout from "./pages/Logout";
import PrivateRoute from "./pages/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NotificationProvider>
            <AppProvider>
              <Header />
              <Switch>
                <Route exact path="/fixtures" component={Fixtures} />
                <PrivateRoute exact path="/mybets" component={BetHistory} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/logout" component={Logout} />
                <Route path="*" component={Fixtures} />
              </Switch>
            </AppProvider>
            <Notification />
          </NotificationProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
