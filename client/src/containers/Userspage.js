// import React from "react";
// import Axios from "axios";




  
  
//   class App extends React.Component {
//     state = {
//       users: [],
//       isLoading: true,
//       errors: null
//     };
  
//     getUsers() {

    
//       Axios
//         .get("https://randomuser.me/api/?results=5")
//         .then(response =>
//           response.data.results.map(user => ({
//             name: `${user.name.first} ${user.name.last}`,
//             username: `${user.login.username}`,
//             email: `${user.email}`,
//             image: `${user.picture.thumbnail}`
//           }))
//         )
//         .then(users => {
//           this.setState({
//             users,
//             isLoading: false
//           });
//         })
//         .catch(error => this.setState({ error, isLoading: false }));
//     }

//      Users = ({user}) => {
//         return (
//           <div className="box media">
//             <figure>
//                 src={user.image} alt={user.name}
//             </figure>
//             <div className="media-content">
//               <p className="subtitle">{user.name}</p>
//               <p>{user.email}</p>
//             </div>
//           </div>
//         )
//       }
  
//     componentDidMount() {
//       this.getUsers();
//     }
  
//     render() {
//       const { isLoading, users } = this.state;
//       return(
//       <section className="section">
//           <div className="container">
//             {!isLoading ? (
//               users.map(user => {
//                 return <Users key={user.username} user={user} />;
//               })
//             ) : (
//               <p>Loading...</p>
//             )}
//           </div>;
  
//       </section>
//     );
//     }
//   }
  
//   export default Users;