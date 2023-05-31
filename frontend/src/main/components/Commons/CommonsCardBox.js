import { useBackend } from "main/utils/useBackend";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CommonsCardBox = ({ commons }) => {
  // Stryker disable all
  const id = commons ? commons.id : -1;
  
  const commonsData = useBackend(
    [`api/usercommons/forcurrentuser?commonsId=${id}`],
    {
      method: "GET",
      url: '/api/usercommons/forcurrentuser',
      params: {
        commonsId: id,
      }
    }
  );
  // Stryker enable all

  if (!commonsData || !commonsData.data || !commons) {
    return null
  }

  return (
    <Card
      data-testid={"commons-card-box-" + id} style={
        // Stryker disable all : no need to unit test CSS
        {
          width: '18rem',
          margin: '0.3rem',
          backgroundColor: 'white',
          borderRadius: '0.5em',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }
        // Stryker enable all
      }>
      <Card.Body>
        <Card.Title>{commons.name}</Card.Title>
        <Card.Text style={
          // Stryker disable next-line all : no need to unit test CSS
          { margin: "0.2em" }
        }>
          Total wealth: ${commonsData.data.totalWealth}
        </Card.Text>
        <Card.Text>
          Owned cows: {commonsData.data.numOfCows}
        </Card.Text>
        <Link to={"/play/" + id} data-testid={"enter-common-" + id} style={{
          // Stryker disable next-line all : no need to unit test CSS
          textDecoration: 'none'
        }}>
          <Button variant="primary">
            Enter
          </Button>
        </Link>
      </Card.Body>
    </Card>
  )
};

export default CommonsCardBox;
