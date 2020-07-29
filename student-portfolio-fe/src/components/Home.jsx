import React, { Component } from 'react';
import axios from 'axios'
import {Card,Button,CardDeck,Row,Col,Container, Accordion,Alert,Spinner} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import HomeJumbotron from './HomeJumbotron'
import {connect} from 'react-redux'

const   mapStateToProps = (state) => (
         {...state}
  )

 const  mapDispatchToProps = (dispatch) => ({
        showSpinner : () => 
            dispatch({
            type:"show_spinner",
        })
    })
class Home extends Component {
    state = { 
        students:[]
     }

    componentDidMount = async () => {
        const response = await  fetch("http://localhost:3005/student",{
            method:"GET",
            Headers:{
                "Content-Type":"application/json"
            }
        })

     let students = await response.json()
       this.setState({students})
       console.log(this.state.students)
    }
    render() { 
        return ( 
            <div>
            <Container>
                <HomeJumbotron/>              
<Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-3 text-center">
              {this.props.showSpinner ? 
 <div className="d-flex justify-content-center" style={{ width: "10%", height: "auto" }} >
              <Spinner animation="grow" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
            </div> :   this.state.students.map((student,index) => (
     <Card className="col">
     <Card.Img variant="top" src="../../assets/placeholder.jpg" />
     <Card.Body>
              <Card.Title>
                  <Link to={'/details/' + student._id} >
                  {student.name}  {student.surname}
                  </Link>
                  </Card.Title>
              <Card.Text>
            {student.projects.map((project) => (

              <Accordion>
  <Card>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
       Click here to see student projects
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">
              <Card.Body>
              <Alert variant="success">{project.name}</Alert>
              </Card.Body>
    </Accordion.Collapse>
  </Card>
  </Accordion>
            )
            )}
      </Card.Text>
     </Card.Body>
     <Card.Footer>
              <small className="text-muted">Student Identification Number - {student._id}</small>
     </Card.Footer>
   </Card>
    )
    )}
    </Row>
            </Container>
            </div>
         );
    }
}
 
export default connect(mapStateToProps , mapDispatchToProps)(Home);