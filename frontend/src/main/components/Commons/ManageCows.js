import React, { useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import cowHead from "./../../../assets/CowHead.png";

const ManageCows = ({ userCommons, commons, onBuy, onSell }) => {
  const [numToBuy, setNumToBuy] = useState(1);

  return (
    <Card>
      <Card.Header as="h5">Manage Cows</Card.Header>
      <Card.Body>
        <Card.Title>Market Cow Price: ${commons?.cowPrice}</Card.Title>
        <Card.Title>Number of Cows: {userCommons.numOfCows}</Card.Title>
        <Row>
          <Col>
            <Card.Text>
              <img altf="Cow Icon" className="icon" src={cowHead}></img>
            </Card.Text>
          </Col>
          <Col>
            <Form.Group controlId="numToBuy">
              <Form.Label>Number of cows to buy:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={numToBuy}
                onChange={(e) => setNumToBuy(parseInt(e.target.value))}
              />
            </Form.Group>
            <Button
              variant="outline-danger"
              onClick={() => {
                onBuy(userCommons, numToBuy);
              }}
              data-testid={"buy-cow-button"}
            >
              Buy cow
            </Button>
            <br />
            <br />
            <Button
              variant="outline-danger"
              onClick={() => {
                onSell(userCommons);
              }}
              data-testid={"sell-cow-button"}
            >
              Sell cow
            </Button>
            <br />
            <br />
          </Col>
        </Row>
        Note: Buying cows buys at current cow price, but selling cows sells at
        current cow price times the average health of cows as a percentage!
      </Card.Body>
    </Card>
  );
};

export default ManageCows;