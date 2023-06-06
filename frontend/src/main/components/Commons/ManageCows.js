import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import cowHead from "./../../../assets/CowHead.png";

const ManageCows = ({ userCommons, commons, onBuy, onSell }) => {
  const [showBuyHerdModal, setShowBuyHerdModal] = useState(false);
  const [numOfCowsToBuy, setNumOfCowsToBuy] = useState(2);
  const handleBuyHerdModalClose = () => setShowBuyHerdModal(false);
  const handleBuyHerdModalShow = () => setShowBuyHerdModal(true);
  const handleNumOfCowsToBuyChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= 2 && !isNaN(value)) {
      setNumOfCowsToBuy(value);
    }
  };
  const handleBuyHerd = () => {
    //Stryker disable-next-line all
    onBuy( numOfCowsToBuy );
    handleBuyHerdModalClose();
  };

  return (
    <Card>
      <Card.Header as="h5">Manage Cows</Card.Header>
      <Card.Body>
        <Card.Title>Market Cow Price: ${commons?.cowPrice}</Card.Title>
        <Card.Title>Number of Cows: {userCommons.numOfCows}</Card.Title>
        <Card.Title>Cows Dead: {userCommons.cowDeaths}</Card.Title>
        <Row>
          <Col>
            <Card.Text>
              <img alt="Cow Icon" className="icon" src={cowHead}></img>
            </Card.Text>
          </Col>
          <Col>
            <Button
              variant="outline-danger"
              onClick={handleBuyHerdModalShow}
              data-testid={"buy-herd-button"}
            >
              Buy herd
            </Button>
            <br />
            <br />
            <Button
              variant="outline-danger"
              //Stryker disable all
              onClick={() => {onBuy(1);}}
              data-testid={"buy-cow-button"}
                 //Stryker enable all

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
          </Col>
        </Row>
        <p>
          Note: Buying cows buys at the current cow price, but selling cows sells at the current cow price times the average health of cows as a percentage!
        </p>
        <Modal show={showBuyHerdModal} onHide={handleBuyHerdModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Buy herd</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>How many cows do you want to buy?</Form.Label>
              <Form.Control
                type="number"
                min={2}
                value={numOfCowsToBuy}
                onChange={handleNumOfCowsToBuyChange}
                data-testid={"buyHerdForm"}
              />
            </Form.Group>
            <p>Cost: ${numOfCowsToBuy * commons?.cowPrice}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleBuyHerdModalClose} data-testid={"closemodalbutton"}>
              Close
            </Button>
            <Button variant="primary" onClick={handleBuyHerd}>
              Buy
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default ManageCows;
