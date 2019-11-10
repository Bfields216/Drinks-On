


import React from "react";

import {
  // Avatar,
  Button,
  Card,
  CardActions,
  CardText,
  CardTitle,
} from 'react-md';

// import { randomImage } from 'utils/random';

const style = { maxWidth: 600 };
// const avatar = randomImage();

const Expandable = () => (
  <Card style={style} className="md-block-centered">
  <CardTitle
   
      title="Card Title"
      subtitle="Card Subtitle"
      // avatar={<Avatar src={avatar} role="presentation" />}
    />
    <CardActions expander>
      <Button flat>Action 1</Button>
      <Button flat>Action 2</Button>
    </CardActions>
    <CardText expandable>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet orci
        elit, sed eleifend nunc blandit auctor. Phasellus sodales vestibulum aliquet.
        Cras neque leo, congue eu risus non, lobortis sagittis dui. Curabitur auctor
        nibh at dignissim scelerisque. Duis urna risus, sodales vitae viverra vitae,
        placerat eu nulla. Nam eget ante congue enim interdum consectetur. In pharetra
        viverra tempor.
      </p>
     
    </CardText>
    <div>
     <p>Welcome to the Checkin in Page</p>

    <button onClick={(e) => this.handleClick(e)}>
   Click me
  </button>
  </div>
  </Card>
);
export default Expandable;
