import React, { useState} from 'react'
import { Container, Form, FormControl } from 'react-bootstrap';


const Search = ({searchResults}) => {
    const [ search, setSearch ] = useState('')
        

    const handleSearch = (e) => {
        setSearch(e.target.value)
        searchResults(search)
    }

    

    return (
        <Container>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    name='search'
                    placeholder="Busca tu superhéroe"
                    className="my-4 search"
                    aria-label="Busca tu superhéroe"
                    value={search}
                    onChange={handleSearch}
                />
            </Form>
            {
                search !== '' && <h3>Resultados para la búsqueda: {search}</h3>
            }
        </Container>
    )
}

export default Search
