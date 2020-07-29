import React, { Component } from 'react';
import {Row,Col,Container,Image} from 'react-bootstrap'

class StudentDetails extends Component {
    state = { 
        details:{}
     }

     
    componentDidMount = async () => {
        const studentId = this.props.match.params.id;
        const response = await  fetch("http://localhost:3005/student/" + studentId ,{
            method:"GET",
            Headers:{
                "Content-Type":"application/json"
            }
        })

     let details = await response.json()
       this.setState({details})
       console.log(this.state.details)
    }
    render() { 
        return ( 
            <Container>
            <Row className="mt-3">
                <Col>
                <img src="../../assets/placeholder.jpg"/>
                </Col>
                <Col>
        <h3>{this.state.details.name}</h3>
                </Col>
            </Row>
            </Container>
         );
    }
}
 
export default StudentDetails;