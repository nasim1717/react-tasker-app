import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import NotFound from "./Pages/NotFound/NotFound";
import Main from "./Main/Main";
import Inprogress from "./Pages/Inprogress/Inprogress";
import Complete from "./Pages/Complete/Complete";
import Favourite from "./Pages/Favourite/Favourite";
import Registration from "./Pages/Registration/Registration";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/inprogress" element={<Inprogress />} />
          <Route path="/complete" element={<Complete />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
