import { FC } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./context/auth/authContext";
import { useDarkModeContext } from "./context/darkMode/darkModeContext";
import { productInputs, userInputs } from "./data/formSource";
import { Home, List, Login, New, Single } from "./pages";
import './style/dark.scss'

interface Props {
  children: React.ReactNode
}
const App = () => {

  const { darkMode } = useDarkModeContext().state
  const { currentUser } = useAuthContext().state;

  const RequireAuth: FC<Props> = ({children}) : any=>{
    return currentUser ? children : <Navigate to='/login'/> 
  }

  return (
    <div className={darkMode ? 'app dark' : 'app`'}>
      <Router>
        <Routes>
          <Route path="/">
            <Route 
              index 
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
                }
            />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route 
                index 
                element={
                  <RequireAuth>
                   <List />
                  </RequireAuth>
                }
                />
              <Route 
                path=":userId" 
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                } />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route 
                index 
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>} />
              <Route path=":productId" element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
              } />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={productInputs} title="Add New Product" />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App