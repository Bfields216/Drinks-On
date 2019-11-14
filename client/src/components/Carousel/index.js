import React from "react";
import "./style.css";
import {Container} from "react-bootstrap"


// import {Carousel} from "react-bootstrap-carousel"

const imageData = [
  {0: "https://images.unsplash.com/photo-1559629279-9c61598ef63e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
  {1: "https://www.vpr.org/sites/vpr/files/styles/x_large/public/201712/pouring-whiskey-into-glass-with-ice-istock-igorr1.jpg"},
  {2: "https://images.unsplash.com/photo-1547146598-0962d0d87c97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
  {3: "https://static.vinepair.com/wp-content/uploads/2016/11/cocktailsubs-internal-header.jpg"},
  {4: "https://www.breslins.co.uk/wp-content/uploads/2019/07/cocktails-promo-1024x536.jpg"},
  
];

// const imageData = [
//    {0: 'assets/slide1.jpg'},
//    {1: 'assets/slide4.jpg'},
//    {2: 'assets/slide1.jpg'},
//    {3: 'assets/slide1.jpg'},
//    {3: 'assets/pic2.jpg'}
    
  
// ];

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    
    this.showImage = this.showImage.bind(this);
  }
  
  showImage() {
    return (
      <img 
        alt = "rotating drinks"
        src= { imageData[this.props.imageShow][this.props.imageShow] }
        style = {{ width: "100%" }} 
        />
    );
  }
  
  
  render() {
    return (
      <div className="carousel">
        { this.showImage() }
      </div>
    );
  }
}

// class CarouselControl extends React.Component {
//   constructor(props){
//     super(props);
//   }
  
//   render() {
//     return(
//       <div>
//         <button onClick={this.props.prev}>Prev</button>
//         <button onClick={this.props.next}>Next</button>
//       </div>
//     );
//   }
// }

class Landing extends React.Component {
  constructor(){
    super();
    
    this.state = {
      imageShow: 0,
    }
    
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.slideShow = this.slideShow.bind(this);
  }
  
  componentDidMount(){
    this.slideShow();
  }
  
  componentWillUnmount(){
    clearInterval(this.slideShow);
  }
  
  prev(){
    if (this.state.imageShow === 0){
      this.setState({ imageShow: imageData.length - 1 });
    } else {
      this.setState({ imageShow: this.state.imageShow - 1 });
    }
  }
  
  next(){
    if (this.state.imageShow === imageData.length - 1) {
      this.setState({ imageShow: 0 });
    } else {
      this.setState({ imageShow: this.state.imageShow + 1 });
    }
  }
  
  slideShow(){
    setInterval(() => this.next(), 5000);
  }
  
  render() {
    return(
    
      <>
      <Container className="welcome">
      <h1>Welcome to Drinks on Us</h1>
      <p className="lead">
      A way for User's to create an Order with a Bartender and Skip the
      Line.
      </p>

    </Container>
      <Carousel style={{ height: `100vh`, alignContent: 'center'}} fluid
          imageShow = { this.state.imageShow }
          >
          
      
        </Carousel>
        </>
    );
  }
}
export default Landing;





