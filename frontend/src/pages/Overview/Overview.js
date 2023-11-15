import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";

export function Overview() {
    return (
        <Container className="overview top-content gap-3">
            <Row className="gap-3 flex-column w-100">
                <Col>
                    <Link to="/vragenlijsten" className="item">
                        <span className="material-icons tileIcon fs-1">list_alt</span>
                        <div className="flex">
                            <h2>Vragenlijsten</h2>
                            <div className="bttn">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to="/leden" className="item">
                        <span className="material-icons tileIcon fs-1">person</span>
                        <div className="flex">
                            <h2>Leden</h2>
                            <div className="bttn">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to="/vragen" className="item">
                        <span className="material-icons tileIcon fs-1">insights</span>
                        <div className="flex">
                            <h2>Vragen</h2>
                            <div className="bttn">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                    </Link>
                </Col>
            </Row>
            <Row className="gap-3 flex-column w-100">
                <Col>
                    <Link to="/teams" className="item">
                        <span className="material-icons tileIcon fs-1">group</span>
                        <div className="flex">
                            <h2>Teams</h2>
                            <div className="bttn">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to="/rapportages" className="item">
                        <span className="material-icons tileIcon fs-1">insights</span>
                        <div className="flex">
                            <h2>Rapportages</h2>
                            <div className="bttn">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to="/antwoorden" className="item">
                        <span className="material-icons tileIcon fs-1">insights</span>
                        <div className="flex">
                            <h2>Antwoorden</h2>
                            <div className="bttn">
                                <span className="material-icons">keyboard_arrow_right</span>
                            </div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}