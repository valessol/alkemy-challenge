import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  ProgressBar,
  Row,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { TeamContext } from "../../Context/TeamContext";

const TeamView = () => {
  const [loader, setLoader] = useState(false);
  const [removeId, setRemoveId] = useState("");
  const {
    removeFromTeam,
    totalPowerstats,
    team,
    promAttr,
    complete,
    removeAll,
  } = useContext(TeamContext);
  const { push } = useHistory();
  console.log(team);
  //NOTE: validar que el team no esté vacío
  //Calculo de atributos
  const totalIntelligence = totalPowerstats("intelligence");
  const totalStrenght = totalPowerstats("strenght");
  const totalSpeed = totalPowerstats("speed");
  const totalDurability = totalPowerstats("durability");
  const totalPower = totalPowerstats("power");
  const totalCombat = totalPowerstats("combat");

  console.log(
    totalIntelligence,
    totalStrenght,
    totalSpeed,
    totalDurability,
    totalPower,
    totalCombat
  );
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

  // const totalPowrstatsValues = [
  //     {intelligence: totalIntelligence},
  //     {strenght: totalStrenght},
  //     {speed: totalSpeed},
  //     {durability: totalDurability},
  //     {power: totalPower},
  //     {combat: totalCombat}
  // ]

  // const orderedPowerstats = totalPowrstatsValues.sort( function (a, b) {
  //     return (a.)
  // })
  useEffect(() => {
    if (team.length === 0) {
      push("/heros");
    }
  }, [team]);

  return (
    <Container fluid className="detail mt-0" style={{ padding: 0 }}>
      {loader ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        <>
          <div className="teamHero d-flex">
            {team.map((item, index) => {
              return <img 
                        src={item.image?.url} 
                        alt={item.name} 
                        className={(team.length === 1) ? 'length1' : (team.length === 2) ? 'length2' : (team.length === 3) ? 'length3' : (team.length === 4) ? 'length4' : (team.length === 5) ? 'length5' : 'length6'} 
                    />;
            })}
          </div>

          <Container>
            {complete ? (
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
            )}

            <Row>
              <Col md={12} className="my-4">
                <div className="d-flex justify-content-center">
                  <Badge bg="success" className="cardBadge m-2">
                    Inteligencia
                  </Badge>
                  <Badge bg="warning" className="cardBadge m-2">
                    Fuerza
                  </Badge>
                  <Badge bg="danger" className="cardBadge m-2">
                    Velocidad
                  </Badge>
                  <Badge className="cardBadge m-2">Durabilidad</Badge>
                  <Badge bg="info" className="cardBadge m-2">
                    Poder
                  </Badge>
                  <Badge bg="secondary" className="cardBadge m-2">
                    Combate
                  </Badge>
                </div>
                <ProgressBar>
                  <ProgressBar
                    striped
                    variant="success"
                    now={totalIntelligence}
                    key={1}
                  />
                  <ProgressBar variant="warning" now={totalStrenght} key={2} />
                  <ProgressBar
                    striped
                    variant="danger"
                    now={totalSpeed}
                    key={3}
                  />
                  <ProgressBar striped now={totalDurability} key={4} />
                  <ProgressBar
                    striped
                    variant="info"
                    now={totalPower}
                    key={5}
                  />
                  <ProgressBar
                    striped
                    variant="secondary"
                    now={totalCombat}
                    key={6}
                  />
                </ProgressBar>
              </Col>
            </Row>
            <Row className="d-flex flex justify-content-center">
              <Col md={5} className="detailData--column m-4">
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

              <Col md={5} className="detailData--column m-4">
                <div>
                  <h3>Atributos de equipo: </h3>
                  <ul>
                    {/* <li >Peso promedio: {promAttr('weight')}</li>                                               
                                                <li >Altura promedio: {promAttr('height')}</li>                                                */}
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
        </>
      )}
    </Container>
  );
};

export default TeamView;
