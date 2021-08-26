import React, {useContext} from "react";
// import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Nav } from "react-bootstrap";

import {userContext} from "../App";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

export default function Header(props) {
  const {state, dispatch} = useContext(userContext);
  const classes = useStyles();
  const { sections, title } = props;

  const RenderMenue = () =>{
    // console.log(state);
    if(state){
      return (
        <>
        <li className="nav-item active">
        {/* <NavLink className="nav-link mr-md-2" to="#">Home <span className="sr-only">(current)</span></NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="#">Home</Link>
          </Button>
      </li>
      <li className="nav-item">
        {/* <NavLink className="nav-link mr-md-2" to="#">About</NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="#">About</Link>
          </Button>
      </li>
      <li className="nav-item">
        {/* <NavLink className="nav-link mr-md-2" to="#">Contact</NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="#">Contact</Link>
          </Button>
      </li>
      <li className="nav-item">
        {/* <NavLink className="nav-link mr-md-2" to="/logout">Logout</NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="/logout">Logout</Link>
          </Button>
      </li>
        </>
      );
    }else{
      return(
        <>
        <li className="nav-item active">
        {/* <NavLink className="nav-link mr-md-2" to="/">Home <span className="sr-only">(current)</span></NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="#">Home</Link>
          </Button>
      </li>
      <li className="nav-item">
        {/* <NavLink className="nav-link mr-md-2" to="#">About</NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="#">About</Link>
          </Button>
      </li>
      <li className="nav-item">
        {/* <NavLink className="nav-link mr-md-2" to="#">Contact</NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="#">Contact</Link>
          </Button>
      </li>
      <li className="nav-item">
        {/* <NavLink className="nav-link mr-md-2" to="/studentsignin">Login</NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="/studentsignin">SignIn</Link>
          </Button>
      </li>
      <li className="nav-item">
        {/* <NavLink className="nav-link mr-md-2" to="/studentsignup">Signup</NavLink> */}
        <Button variant="outlined" size="small">
            <Link href="/studentsignup">SignUp</Link>
          </Button>
      </li>
        </>
      );
    }
  }

  return (
    <header className="header">
      <React.Fragment>
        <Toolbar className={classes.toolbar}>
          <Button size="small">
            <Nav.Link href="/myshelf">My Shelf</Nav.Link>
          </Button>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            <Nav.Link href="/">
              <h1>{title}</h1>
            </Nav.Link>
          </Typography>
          <IconButton>
            <SearchIcon />
          </IconButton>
          {/* <Button variant="outlined" size="small">
            <Link href="/studentsignin">Sign in</Link>
          </Button>
          <Button variant="outlined" size="small">
            <Link href="/studentsignup">Sign UP</Link>
          </Button> */}
          <RenderMenue/> 
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          className={classes.toolbarSecondary}
        >
          {sections.map((section) => (
            <Link
              color="inherit"
              noWrap
              key={section.title}
              variant="body2"
              href={section.url}
              className={classes.toolbarLink}
            >
              {section.title}
            </Link>
          ))}
        </Toolbar>
      </React.Fragment>
    </header>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
