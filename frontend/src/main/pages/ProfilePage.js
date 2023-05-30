import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import RoleBadge from "main/components/Profile/RoleBadge";
import { useCurrentUser } from "main/utils/currentUser";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import ReactJson from "react-json-view";
import { Link } from "react-router-dom";

const ProfilePage = () => {

    const { data: currentUser } = useCurrentUser();

    if (!currentUser.loggedIn) {
        return (
            <p>Not logged in.</p>
        )
    }

    const { email, pictureUrl, fullName, commons } = currentUser.root.user;
    return (
        <BasicLayout>
            <Row className="align-items-center profile-header mb-5 text-center text-md-left">
                <Col md={2}>
                    <img
                        src={pictureUrl}
                        alt="Profile"
                        className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
                    />
                </Col>
                <Col md>
                    <h2>{fullName}</h2>
                    <p className="lead text-muted">{email}</p>
                    <RoleBadge role={"ROLE_USER"} currentUser={currentUser} />
                    <RoleBadge role={"ROLE_MEMBER"} currentUser={currentUser} />
                    <RoleBadge role={"ROLE_ADMIN"} currentUser={currentUser} />
                </Col>
            </Row>
            <Row className="align-items-center profile-header mb-5 text-center text-md-left">
                {commons && commons.map((common) => (
                    <Card key={common.id} style={
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
                            <Card.Title>{common.name}</Card.Title>
                            <Card.Text>
                                Cow price: {common.cowPrice}
                            </Card.Text>
                            <Card.Text>
                                Milk price: {common.milkPrice}
                            </Card.Text>
                            <Link to={"/play/" + common.id} data-testid={"enter-common-" + common.id} style={{
                                // Stryker disable next-line all : no need to unit test CSS
                                textDecoration: 'none'
                            }}>
                                <Button variant="primary">
                                    Enter
                                </Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </Row>
            <Row className="text-left">
                <ReactJson src={currentUser.root} />
            </Row>
        </BasicLayout>
    );
};

export default ProfilePage;
