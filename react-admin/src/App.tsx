import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home, List, Login, New, Single } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
         <Route path ='/'>
           <Route index element={<Home/>}/>
           <Route path = 'login' element = {<Login/>}/>
           <Route path = 'users'>
             <Route index element={<List/>}/>
             <Route path=':userId' element={<Single/>}/>
             <Route path = 'new' element = {<New/>}/>
           </Route>
           <Route path = 'products'>
             <Route index element={<List/>}/>
             <Route path=':productId' element={<Single/>}/>
             <Route path = 'new' element = {<New/>}/>
           </Route>
         </Route>
      </Routes>
    </Router>
  )
}

export default App