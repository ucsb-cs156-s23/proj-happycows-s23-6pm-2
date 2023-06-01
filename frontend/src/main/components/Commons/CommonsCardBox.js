import { useBackend } from "main/utils/useBackend";
import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// This should only be used directly for stories. Otherwise use the default export.
export function CommonsCardBoxWithData({ commons, userCommons }) {
  return (
    <Card
      data-testid={"commons-card-box-" + commons.id} style={
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
          Total wealth: ${userCommons.totalWealth}
        </Card.Text>
        <Card.Text>
          Owned cows: {userCommons.numOfCows}
        </Card.Text>
        <Link to={"/play/" + commons.id} data-testid={"enter-common-" + commons.id} style={{
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
}

const CommonsCardBox = ({ commons }) => {
  // Stryker disable all
  const id = commons ? commons.id : -1;

  const userCommons = useBackend(
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

  if (!userCommons || !userCommons.data || !commons) {
    return null
  }

  return (
    <CommonsCardBoxWithData commons={commons} userCommons={userCommons.data} />
  )
};

export default CommonsCardBox;
