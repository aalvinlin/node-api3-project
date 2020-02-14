import React, {useState, useEffect} from "react";
import axios from "axios";
// import { getAllUsers, getAllPosts, addUser } from "./utils/databaseFunctions";

const App = () => {

  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const [newUserInput, setNewUserInput] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(undefined);

  const [editUserInput, setEditUserInput] = useState("");

  // load all users and posts upon page load
  useEffect(() => {
    
    getAllUsers();
    getAllPosts();

  }, [])

  const getAllUsers = () => {

    axios.get("http://localhost:5000/api/users") 
    .then(response => {
        console.log("response fron /api/users:", response);
        setAllUsers(response.data);
    })
    .catch(error => {
        console.log("error from /api/users:", error);
    })
    
  }
  
  const addUser = (user) => {
    
    axios.post("http://localhost:5000/api/users", { name: user}) 
    .then(response => {
        console.log("response fron /api/users:", response);
        getAllUsers();
    })
    .catch(error => {
        console.log("error from /api/users:", error);
    })
    
  }
  
  const getAllPosts = () => {
    axios.get("http://localhost:5000/api/posts") 
      .then(response => {
        console.log("response fron /api/posts:", response);
        setAllPosts(response.data);
      })
      .catch(error => {
        console.log("error from /api/posts:", error);
      })
  }

  const handleAddChange = event => {
    setNewUserInput(event.target.value);
  }

  const handleAddUserSubmit = event => {
    event.preventDefault();
    console.log("test");
    addUser(newUserInput);
  }

  const deleteUser = (userId) => {

    axios.delete("http://localhost:5000/api/users/" + userId) 
      .then(response => {
          console.log("response fron /api/users/:id:", response);

          getAllUsers();
      })
      .catch(error => {
          console.log("error from /api/users/:id:", error);
      })
    
  }


  const editUser = () => {

    axios.put("http://localhost:5000/api/users/" + editingId, {id: editingId, name: editUserInput}) 
      .then(response => {
          console.log("response fron /api/users/:id:", response);

          getAllUsers();
      })
      .catch(error => {
          console.log("error from /api/users/:id:", error);
      })
    
  }


  const toggleIsEditing = (id) => {

    if (!isEditing || (isEditing && id !== editingId))
      {
        setIsEditing(true);
        setEditingId(id);
      }
    else
      {
        setIsEditing(false);
        setEditingId(undefined);
      }
  }

  const handleEditUserSubmit = event => {
    event.preventDefault();
    console.log("test");
    editUser(newUserInput);
  }


  const handleEditChange = event => {
    setEditUserInput(event.target.value);
  }

  return (
    <div className="content">
      <div className="allUsers">
        <h2>Users</h2>
          {allUsers.map(user =>
            <div key={user.id}>
              <button onClick={() => deleteUser(user.id)}>X</button>
              <button onClick={() => toggleIsEditing(user.id)}>Edit</button>
              {user.name}
              
              {isEditing && user.id === editingId ?
              
              <form name="editUser" onSubmit={handleEditUserSubmit}>
                <input type="text" name={editUserInput} value={editUserInput} onChange={handleEditChange} />
                <button>Edit User</button>
              </form>
              
              : ""}
            </div>
          )}
        <form name="addUser" onSubmit={handleAddUserSubmit}>
          <input type="text" name={newUserInput} value={newUserInput} onChange={handleAddChange} />
          <button>Add User</button>
        </form>
      </div>
      <div className="allPosts">
        <h2>Posts</h2>
        {allPosts.map(post => <p key={post.id}>{post.text}</p>)}
      </div>
    </div>
  );
  }

  export default App;