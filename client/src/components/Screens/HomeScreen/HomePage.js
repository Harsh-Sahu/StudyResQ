import React, { useCallback } from "react";
import Axios from "axios";
import Card from '@material-ui/core/Card';
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { Toast } from "bootstrap";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
toast.configure();

const useStyles = makeStyles(theme=>({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    maxWidth: 380,
  },
  media: {
    height: 140,
  },
}));


function MediaCard(props) {
  const classes = useStyles();
  // const [id, setid] = React.useState(props._id);
  const [name,setname]=React.useState("kl");
  
 


  return (
    <>
      {
        <Link href={"http://localhost:3001/files/"+props.filename}>
       <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/public/images/book.jpg"
          title={props.filename}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          <h4>Book Name</h4>
          {props.filename}
           <p></p>
          <h4>Book ID</h4>
          {props._id}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
    </Link>
      }
    </>
  );
}




export default function HomePage() {
  const [Files, setFiles] = React.useState([]);
  const address = "http://localhost:3001/allfiles";
  React.useEffect(() => {
    Axios.post(address).then((result) => {
      console.log(result);
      setFiles(result.data.files);
    });
  }, []);

  return (
    <div>
      {(
          <div style={{ margin: "auto", width: "90%" }}>
            {Files.slice(0, 20).map((item) => {
              return (
                <>
                  <MediaCard {...item} />
                </>
              );
            })}
          </div>
      )}
    </div>
  );
}