import React, { useState } from "react";
import { Card, Button, Row, Col, Modal, Form } from "react-bootstrap";
import cowHead from "./../../../assets/CowHead.png";
// add parameters 
const ManageCows = ({ userCommons, commons, onBuy, onSell }) => {
  // Stryker disable next-line all : hard to set up test for caching
  const [showBuyHerdModal, setShowBuyHerdModal] = useState(false);
  const [numOfCowsToBuy, setNumOfCowsToBuy] = useState(2);

  //  handlers for the  herd modal and the number of cows to buy
  // Stryker disable next-line all
  const handleBuyHerdModalClose = () => setShowBuyHerdModal(false);
  const handleBuyHerdModalShow = () => setShowBuyHerdModal(true);
  const handleNumOfCowsToBuyChange = (event) =>
    setNumOfCowsToBuy(parseInt(event.target.value));

  const handleBuyHerd = () => {
    // Stryker disable next-line all
    onBuy({ ...userCommons, numOfCows: numOfCowsToBuy });
    handleBuyHerdModalClose();
  };

  return (
    <Card>
      <Card.Header as="h5">Manage Cows</Card.Header>
      <Card.Body>
        <Card.Title>Market Cow Price: ${commons?.cowPrice}</Card.Title>
        <Card.Title>Number of Cows: {userCommons.numOfCows}</Card.Title>
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
              onClick={() => {
                onBuy(userCommons);
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
          </Col>
        </Row>

        <p>Note: Buying cows buys at current cow price, but selling cows sells at current cow price times the average health of cows as a percentage!
        </p>
        {/* Buy herd modal */}
        <Modal show={showBuyHerdModal} onHide={handleBuyHerdModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Buy herd</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>How many cows do you want to buy?</Form.Label>
              { }
              <Form.Control
                type="number"
                min={2}
                value={numOfCowsToBuy}
                onChange={handleNumOfCowsToBuyChange}
                data-testid={"buyHerdForm"}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {/* Buttons to close the modal or buy the herd */}
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