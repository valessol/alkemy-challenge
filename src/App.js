import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { TeamProvider } from './Context/TeamContext';
import { SuperHeroProvider } from './Context/SuperHeroContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import { SearchProvider } from './Context/SearchContext';
import CardListContainer from './Components/Card/CardListContainer';
import CardDetail from './Components/CardDetail/CardDetail';
import TeamView from './Components/TeamView/TeamView';
import ErrorPage from './Components/ErrorPage/ErrorPage';


function App() {
  //NOTE: deshabilitar boton añadir al quipo cuando la longitud sea 6
  //NOTE: envLocal
  //NOTE: los filtros no andan
  //NOTE: no guarda en localstorage
  //NOTE: falta login
  return (
        <>
            <TeamProvider>
                <SuperHeroProvider>

                    <BrowserRouter>

                        <NavBar />

                        <Switch >

                            <Route exact path="/" component={TeamView} />
                            <Route exact path='/heros' component={CardListContainer} />
                            <Route exact path='/heros/:itemId' component={CardDetail} />
                            <Route path='*' component={ErrorPage} />

                            
                        </Switch>

                    </BrowserRouter>

                </SuperHeroProvider>
            </TeamProvider>
        </>
    );
}

export default App;
