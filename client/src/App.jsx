import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Outlet} from 'react-router-dom';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import LinkPage from "./components/LinkPage/LinkPage";
import Missing from "./components/Missing/Missing";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import './App.css';
import Editor from "./components/Editor/Editor";
import Lounge from "./components/Lounge/Lounge";
import CreatePost from "./components/CRUD/Posts/CreatePost";
import UpdatePost from "./components/CRUD/Posts/UpdatePost";
import SelfPost from "./components/CRUD/Posts/SelfPost";

const ROLES_LIST = {
  'Admin':5150,
  'Editor': 1984,
  'User': 2001
}

function App() {

  return (
    <>
      <div>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/linkpage" element={<LinkPage />}/>

          {/* Protect route */}
          <Route element={<PersistLogin />}>
            
            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin, ROLES_LIST.Editor]} />}>
              <Route path="/" element={<Home />}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Admin]} />}>
              <Route path="/admin" element={<Admin />}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES_LIST.Editor, ROLES_LIST.Admin]} />}> 
              <Route path="/editor" element={<Editor />} />
            </Route>

            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/selfpost" element={<SelfPost />} />
            <Route path="/update/:id" element={<UpdatePost />} />

            <Route path="/lounge" element={<Lounge />} />
          </Route>
          

          {/* Catch missing */}
          <Route path="*" element={<Missing />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
