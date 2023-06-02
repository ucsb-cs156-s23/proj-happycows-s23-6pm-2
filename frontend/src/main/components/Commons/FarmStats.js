import React from "react";
import { Card } from "react-bootstrap";
import Health from "./../../../assets/Health.png";
import Cash from "./../../../assets/Cash.png";

const FarmStats = ({ userCommons }) => {
  const cowHealthPercent = Math.round(userCommons.cowHealth * 100 / 100);

  return (
    <Card>
      <Card.Header as="h5">Your Farm Stats</Card.Header>
      <Card.Body>
        <Card.Text>
          <img className="icon" src={Cash} alt="Cash"></img>
        </Card.Text>
        <Card.Text>
          Total wealth: ${userCommons.totalWealth}
        </Card.Text>
        <Card.Text>
          <img className="icon" src={Health} alt="Health"></img>
        </Card.Text>
        <div style={
          // Stryker disable all
          {
            width: "100%",
            padding: "4px",
            background: "rgb(191, 191, 191)",
            borderRadius: "50px",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            height: "34px",
          }
          // Stryker enable all
        }>
          Cow health: {cowHealthPercent}%
          <div style={
            // Stryker disable all
            {
              background: "rgb(191, 60, 60)",
              width: `${cowHealthPercent}%`,
              transition: "width 0.5s linear",
              borderRadius: "50px",
              verticalAlign: "center",
              height: "100%",
              marginTop: "-24px",
            }
            // Stryker enable all
          } />
        </div>
      </Card.Body>
    </Card >
  );
};

export default FarmStats;
