import {Pokedex} from "./Pokedex";
import {Pokemon} from "./Pokemon";
import {Switch, Route, BrowserRouter} from "react-router-dom";

export const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} exact component={Pokedex}/>
                <Route path={"/:id"} component={Pokemon}/>
            </Switch>
        </BrowserRouter>
    );
};
