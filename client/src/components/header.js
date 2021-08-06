// import React from "react";
// import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

// function Header() {
//   return (
//     <header className="header">
//       <Navbar variant="dark">
//         <Navbar.Brand href="/">
//           <h1>StudyResQ</h1>
//         </Navbar.Brand>
//         <Nav className="ml-auto">
//           <Nav.Link href="/home">Home</Nav.Link>
//           <Nav.Link href="/about">About</Nav.Link>
//           <Nav.Link href="/contact">Contact</Nav.Link>
//           <Nav.Link href="/">Log Out</Nav.Link>
//         </Nav>
//       </Navbar>
//       <Form className="d-flex">
//         <FormControl
//           type="search"
//           placeholder="Search"
//           className="mr-2"
//           aria-label="Search"
//         />
//         <Button variant="outline-success">Search</Button>
//       </Form>
//     </header>
//   );
// }

// export default Header;

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Nav } from "react-bootstrap";

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
  const classes = useStyles();
  const { sections, title } = props;

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
          <Button variant="outlined" size="small">
            Sign up
          </Button>
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
