import {
    AppBar,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Grid,
    Toolbar,
    Typography,
    TextField
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles, fade} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import {upperChar} from "./utils";
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        height: "100vh",
        flexDirection: "column",
    },
    header: {},
    pokedexContainer: {
        padding: "20px",
        minHeight: "auto",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        margin: "16px",
    },
    cardMedia: {
        width: "130px",
        height: "130px",
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
}));

export const Pokedex = ({history}) => {
    const classes = useStyles();
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then(response => {
                const {data: {results}} = response;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    const handleSearchChange = (e) => {
        setFilter(e.target.value)
    }

    const getPokemonCard = (pokemonId) => {
        const {id, name, sprite} = pokemonData[pokemonId];

        return (
            <Grid item xs={12} sm={4} key={id}>
                <Card square className={classes.card} onClick={() => history.push(`/${id}`)}>
                    <CardMedia
                        component={"img"}
                        className={classes.cardMedia}
                        image={sprite}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>
                            {id}. {upperChar(name)}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    };


    return (
        <div className={classes.root}>
            <AppBar className={classes.header} position={"static"}>
                <Toolbar>
                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon}/>
                        <TextField className={classes.searchImport}
                                   variant={"standard"}
                                   label={"Pokemon"}
                                   onChange={handleSearchChange}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map(pokemonId =>
                        pokemonData[pokemonId].name.includes(filter) &&
                        getPokemonCard(pokemonId)
                    )}
                </Grid>
            ) : (<Grid container className={classes.pokedexContainer}>
                    <CircularProgress size={"10rem"}/>
                </Grid>
            )}

        </div>
    );
};
