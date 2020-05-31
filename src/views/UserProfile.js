import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import "./user.css"
import React from "react";
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  CardTitle,

} from "reactstrap";
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";
import { Line, Bar } from "react-chartjs-2";

class UserProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: {},
      result: undefined,
      image: '',
      loading: false,
      bigChartData: "data1"
    }
    this.uploadImage = this.uploadImage.bind(this);
    this.fileSelectHandler = this.fileSelectHandler.bind(this)
    this.scanImage = this.scanImage.bind(this);
    this.fileChange = this.fileChange.bind(this);

  }

  componentDidMount() {
    console.log(chartExample1[this.state.bigChartData])
  }


  fileSelectHandler(event) {
    event.persist()
    console.log('file', event);
    this.setState({ file: event.target.files[0] }, () => {
      console.log(this.state.file)
      this.fileChange(event);
    })
  }

  scanImage() {
    console.log('image', this.state.file)
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ result: this.state.file, loading: false })
    }, 4000)
  }

  fileChange(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      //me.modelvalue = reader.result;
      console.log(reader.result);
      this.setState({ image: reader.result });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  uploadImage() {
    document.getElementById("selectImage").click()
  }
  render() {
    if (!this.state.result) {
      return (
        <>
          <div className="content">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <h5 className="title">Scan Profile</h5>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-md-1" md="5">
                          <FormGroup>
                            <label>Patient ID</label>
                            <Input
                              // defaultValue="Id"
                              // disabled
                              placeholder="Patient Id"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="3">
                          <FormGroup>
                            <label>Age</label>
                            <Input
                              // defaultValue="Age"
                              placeholder="Enter Age"
                              type="text"
                              pattern="[0-9]+"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Sex
                          </label>
                            <Input type="select" name="select" id="exampleSelect">
                              <option>Male</option>
                              <option>Female</option>

                            </Input>                        </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>BMI</label>
                            <Input
                              // defaultValue="Mike"
                              placeholder="Enter BMI"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-md-1" md="6">
                          <FormGroup>
                            <label>Blood Pressure</label>
                            <Input
                              // defaultValue="Andrew"
                              placeholder="Enter Blood Pressure"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row> */}
                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <label>Medical History</label>
                            <Input
                              cols="80"
                              // defaultValue="Heart Patient...."
                              placeholder="Here can be your description"
                              rows="4"
                              type="textarea"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <input type="file" id="selectImage" hidden onChange={this.fileSelectHandler} />
                            <Button className="btn-fill" onClick={this.uploadImage} color="primary" >
                              Upload Image</Button>
                            <span style={{ marginLeft: '5px', color: 'white' }}>{this.state.file.name}</span>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <div align="end">
                      <Button className="btn-fill" color="success" type="submit" onClick={this.scanImage}>
                        Scan
                  </Button>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
              {/* <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/emilyz.jpg")}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth And I love you like Kanye loves
                    Kanye I love Rick Owens’ bed design but the back is...
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col> */}
            </Row>
            {this.state.loading ? (<Backdrop open={true} style={{
              zIndex: 9999,
              color: '#fff'
            }}>
              <CircularProgress color="inherit" />
            </Backdrop>) : null}
          </div>
        </>
      );
    } else {
      return <div className="content">
        <Row>
          <Col>
            <ImageEditor
              includeUI={{
                loadImage: {
                  path: this.state.image,
                  name: 'SampleImage'
                },
                // theme:   ,
                // menu: ['shape', 'filter'],
                initMenu: 'filter',
                uiSize: {
                  width: '1000px',
                  height: '700px'
                },
                menuBarPosition: 'bottom'
              }}
              cssMaxHeight={500}
              cssMaxWidth={700}
              selectionStyle={{
                cornerSize: 20,
                rotatingPointOffset: 70
              }}
              usageStatistics={true}
            />

          </Col>
          <Col>
            <Card>
              <CardHeader>
                <h5 className="title">Result</h5>
              </CardHeader>
              <CardBody>
                Cardiology : 50%
                <br></br>
                Edema : 100%
                </CardBody>
            </Card>
          </Col>
        </Row>
        <br></br>
        <Row>
          {/* <Col lg="4"> */}
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Total Cases</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" />{" "}
                14
                  </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line
                  data={chartExample1[this.state.bigChartData]}
                  options={chartExample1.options}
                />
              </div>
            </CardBody>
          </Card>
          {/* </Col> */}
        </Row>
      </div>
    }
  }
}

export default UserProfile;
