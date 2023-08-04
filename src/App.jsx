import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBoards from "./pages/MyBoards";
import SharedBoards from "./pages/SharedBoards";
import AddFriend from "./pages/AddFriend";
import ShowMembers from "./pages/ShowMembers";

function App() {
  return (
    <div id="app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/my-boards" element={<MyBoards />} />
          <Route path="/shared-boards" element={<SharedBoards />} />
          <Route path="/add-friend" element={<AddFriend />} />
          <Route path="/show-member" element={<ShowMembers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
