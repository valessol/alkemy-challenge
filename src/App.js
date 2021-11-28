import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { TeamProvider } from './Context/TeamContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import CardListContainer from './Components/Card/CardListContainer';
import CardDetail from './Components/CardDetail/CardDetail';
import TeamView from './Components/TeamView/TeamView';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import { Login } from './Components/Login/Login';
import { AuthProvider } from './Context/AuthContext';


function App() {
    
 
    return (
        <AuthProvider>
            <TeamProvider>

                    <BrowserRouter>

                        <NavBar />

                        <Switch >
                            
                            <Route exact path="/" component={TeamView} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path='/heros' component={CardListContainer} />
                            <Route exact path='/heros/:itemId' component={CardDetail} />
                            <Route path='*' component={ErrorPage} />
                            
                        </Switch>

                    </BrowserRouter>

            </TeamProvider>
        </AuthProvider>
    );
}

export default App;
