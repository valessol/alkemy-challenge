import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, Col, Container, Form, ProgressBar, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { TeamContext } from "../../Context/TeamContext";

const TeamView = () => {
  const [loader, setLoader] = useState(false);
  const [removeId, setRemoveId] = useState("");
  const {
    removeFromTeam,
    totalPowerstats,
    team,
    teamWeight,
    teamHeight,
    complete,
    removeAll,
  } = useContext(TeamContext);
  const { currentUser } = useContext(AuthContext)
  const { push } = useHistory();
 
  //Calculo de atributos
  const totalPowerstatsOfTeam = [
      totalPowerstats("intelligence"), 
      totalPowerstats("strength"),
      totalPowerstats("speed"),
      totalPowerstats("durability"),
      totalPowerstats("power"),
      totalPowerstats("combat"),
  ]
  const orderedPowerstats = (totalPowerstatsOfTeam.sort(function (a, b) {return b - a}))

  const handleChange = (e) => {
    e.preventDefault();
    return setRemoveId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    removeFromTeam(removeId);
  };
  const colorBadge = (alignment) => {
    let colorName;
    switch (alignment) {
      case "good":
        colorName = "success";
        break;
      case "neutral":
        colorName = "info";
        break;
      case "bad":
        colorName = "danger";
        break;
      default:
        break;
    }
    return colorName;
  };


  useEffect(() => {
    if (!currentUser) {
      push('/login')
    } else if (team.length === 0) {
      push("/heros");
    }
  }, [team, currentUser]);

  return (
    <Container fluid className="detail mt-0" style={{ padding: 0 }}>
      
        
        <div className="teamHero d-flex">
          {team.map((item, index) => {
            return <img 
                      src={item.image?.url} 
                      alt={item.name} 
                      className={(team.length === 1) ? 'length1' : (team.length === 2) ? 'length2' : (team.length === 3) ? 'length3' : (team.length === 4) ? 'length4' : (team.length === 5) ? 'length5' : 'length6'} 
                      key={index}
                  />;
          })}
        </div>

        <Container>
          {
              complete 
                  ? (
                      <h2 className="text-center detailTitle title3">
                        ¡Tu equipo está completo!
                      </h2>
                  ) : (
                      <>
                        <h2 className="text-center detailTitle title3">
                          ¡Aún puedes agregar más integrantes a tu equipo!
                        </h2>
                        <p style={{ fontSize: "2rem" }} className="text-center">
                          Recuerda que puedes agregar hasta 2 integrantes buenos, hasta
                          2 neutrales y hasta 2 malos
                        </p>
                      </>
                  )
          }

          <Row>
            <Col md={12} className="my-4">
              <ProgressBar style={{height: '2rem'}}>
                {
                  orderedPowerstats.map((item, index) =>{
                    return (
                      <ProgressBar
                          style={{backgroundColor: `hsl(${index*50}, 81%, 56%)`, fontSize: '1.4rem', height: '2rem'}}
                          now={item}
                          label={`${item}%`}
                          key={index}
                      />
                    )
                  })
                }
              </ProgressBar>
            </Col>
          </Row>

          <Row className="d-flex flex justify-content-center">
            <Col md={5} className="detailData--column">
              <div>
                <h3>Integrantes: </h3>
                <ul>
                  {team.map((item, index) => {
                    return (
                      <li key={index}>
                        {item.name}

                        <Badge
                          bg={colorBadge(item.alignment)}
                          className="cardBadge m-2"
                        >
                          {item.alignment}
                        </Badge>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>

            <Col md={5} className="detailData--column">
              <div>
                <h3>Atributos de equipo: </h3>
                <ul>
                  <li >{teamWeight()}</li>                                               
                  <li >{teamHeight()}</li>                                               
                  <li >Inteligencia: {totalPowerstats("intelligence")}%</li>                                               
                  <li >Fuerza: {totalPowerstats("strength")}%</li>                                               
                  <li >Velocidad: {totalPowerstats("speed")}%</li>                                               
                  <li >Durabilidad: {totalPowerstats("durability")}%</li>                                               
                  <li >Poder: {totalPowerstats("power")}%</li>                                               
                  <li >Combate: {totalPowerstats("combat")}%</li>                                               
                                                                
                </ul>
              </div>
            </Col>
          </Row>

          <Row>
            <h3 className="my-4 pt-4">
              ¿Deseas eliminar algún miembro del equipo?
            </h3>

            <Form className="my-4">
              <Form.Select
                as={Col}
                style={{ fontSize: "2rem" }}
                aria-label="elige el miembro a eliminar"
                name="removeId"
                value={removeId}
                onChange={handleChange}
              >
                <option style={{ fontSize: "2rem" }}>
                  Selecciona a quien quieres eliminar
                </option>
                {team.map((item, index) => {
                  return (
                    <option
                      key={index}
                      value={item.id}
                      style={{ fontSize: "2rem" }}
                    >
                      {item.name}
                    </option>
                  );
                })}
              </Form.Select>

              <div className="d-flex flex justify-content-center">
                <Button className="button" onClick={handleSubmit}>
                  Eliminar miembro
                </Button>
                <Button className="button" onClick={removeAll}>
                  Eliminar a todos
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
    </Container>
  );
};

export default TeamView;
