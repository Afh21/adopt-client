import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import axios from "axios";

import {
  updateAnimal,
  getProfileAnimal,
  updatePhotoAnimal
} from "../../../redux/actions/animals";
import {
  getAllTypeBreeds,
  getAllTypeRhs
} from "../../../redux/actions/settings/typeAction";

import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  DatePicker,
  Divider,
  Row,
  Col,
  Card,
  Tooltip,
  Switch,
  Tag
} from "antd";
import "./animal.css";

const Option = Select.Option;
const FormItem = Form.Item;
const { Meta } = Card;

class AnimalEdit extends Component {
  constructor(props) {
    super(props);

    this.onFormSubmitUpdatePhoto = this.onFormSubmitUpdatePhoto.bind(this);
    this.onChangeSetFile = this.onChangeSetFile.bind(this);
  }
  state = {
    visibleTooltip: true,
    formToUpdateImage: false,
    file: null
  };

  componentDidMount = () => {
    this.props.getProfileAnimal(this.props.match.params.animalId);

    this.props.getAllTypeBreeds();
    this.props.getAllTypeRhs();
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  handleSubmit = e => {
    const { updateAnimal } = this.props;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.born = values.born._d;
        updateAnimal(this.props.animals.animal._id, values, this.props.history);
      }
    });
  };

  onChangeVisibleTooltip = () => {
    this.setState({
      visibleTooltip: !this.state.visibleTooltip,
      formToUpdateImage: !this.state.formToUpdateImage
    });
  };

  onFormSubmitUpdatePhoto = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    axios
      .post(
        `http://localhost:5000/master/animal/update/photo/${
          this.props.animals.animal._id
        } `,
        formData,
        config
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Set file.
  onChangeSetFile = e => {
    this.setState({ file: e.target.files[0] });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { breeds, rhs, animals } = this.props;

    // console.log("File", this.state.file);
    console.log("animals: ", animals.animal.image);

    return (
      <div className="">
        <Row>
          {/* ======= IMAGE ======= */}
          <Col span={12}>
            <Card
              hoverable
              style={{
                width: 300,
                textAlign: "center",
                margin: " 0px auto"
              }}
              cover={
                <img
                  alt="example"
                  src={
                    animals.animal.image !== null
                      ? "http://localhost:5000" + animals.animal.image
                      : "http://denrakaev.com/wp-content/uploads/2015/03/no-image-800x511.png"
                  }
                />
              }
              actions={[
                <Tag>
                  Tipo: {animals.animal.animal === "cat" ? "Gato" : " Perro "}
                </Tag>,
                <Tooltip
                  placement="right"
                  title="¿Deseas cambiar la foto?"
                  visible={this.state.visibleTooltip}
                >
                  <Switch onChange={this.onChangeVisibleTooltip} />
                </Tooltip>
              ]}
            >
              <Meta title={animals.animal.name} />
            </Card>

            {/* ================ FORM PARA ACTUALIZAR IMAGE ================ */}

            {this.state.formToUpdateImage ? (
              <Form
                style={{ margin: "20px" }}
                layout="inline"
                onSubmit={this.onFormSubmitUpdatePhoto}
              >
                <FormItem label="Foto">
                  <Input
                    type="file"
                    style={{ width: "100%", padding: "10px" }}
                    name="photo"
                    onChange={this.onChangeSetFile}
                  />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" icon="edit">
                    Actualizar Foto
                  </Button>
                </FormItem>
              </Form>
            ) : null}

            {/* ================ FORM PARA ACTUALIZAR IMAGE ================ */}
          </Col>
          {/* ======= IMAGE ======= */}

          <Col span={12}>
            <Form layout="horizontal" onSubmit={this.handleSubmit}>
              <Divider orientation="left">** Actualizar animal</Divider>
              <FormItem label="Nombre del animal">
                {getFieldDecorator("name", {
                  initialValue: animals.animal.name,
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese el nombre del animal"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Nombre del animal"
                  />
                )}
              </FormItem>

              <FormItem label="Animal">
                {getFieldDecorator("animal", {
                  initialValue: animals.animal.animal,
                  rules: [
                    {
                      required: true,
                      message: "Por favor seleccione tipo de animal"
                    }
                  ]
                })(
                  <Select placeholder="Tipo de animal">
                    <Option value="dog">Perro</Option>
                    <Option value="cat">Gato</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="Rh">
                {getFieldDecorator("rh", {
                  initialValue: animals.animal.rh,
                  rules: [
                    {
                      required: true,
                      message: "Por favor seleccione el tipo de sangre"
                    }
                  ]
                })(
                  <Select placeholder="Tipo de rh">
                    {rhs.rhs.map((rh, index) => (
                      <Option
                        style={{ textTransform: "capitalize" }}
                        key={index}
                        value={`${rh._id}`}
                      >{`${rh.name}`}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>

              <FormItem label="Raza">
                {getFieldDecorator("breed", {
                  initialValue: animals.animal.breed,
                  rules: [
                    {
                      required: true,
                      message: "Por favor seleccione la raza"
                    }
                  ]
                })(
                  <Select placeholder="Tipo de raza">
                    {breeds.breeds.map((breed, index) => (
                      <Option
                        style={{ textTransform: "capitalize" }}
                        key={index}
                        value={`${breed._id}`}
                      >{`${breed.name}`}</Option>
                    ))}
                  </Select>
                )}
              </FormItem>

              <FormItem label="Género">
                {getFieldDecorator("genre", {
                  initialValue: animals.animal.genre,
                  rules: [
                    {
                      required: true,
                      message: "Por favor seleccione tipo de género"
                    }
                  ]
                })(
                  <Select placeholder="Tipo de género">
                    <Option value="male">Macho</Option>
                    <Option value="female">Hembra</Option>
                  </Select>
                )}
              </FormItem>

              <FormItem label="Color">
                {getFieldDecorator("color", {
                  initialValue: animals.animal.color,
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese el color del animal"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="highlight"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    placeholder="Color del animal"
                  />
                )}
              </FormItem>

              <FormItem label="Altura del animal">
                {getFieldDecorator("height", {
                  initialValue: animals.animal.height,
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese la altura del animal"
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="colum-height"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    addonAfter="cm"
                    placeholder="Altura del animal"
                  />
                )}
              </FormItem>

              <FormItem label="Peso del animal">
                {getFieldDecorator("weight", {
                  initialValue: animals.animal.weight,
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese el peso del animal."
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon
                        type="colum-height"
                        style={{ color: "rgba(0,0,0,.25)" }}
                      />
                    }
                    addonAfter="kg"
                    placeholder="Peso del animal"
                  />
                )}
              </FormItem>

              <FormItem label="Fecha de nacimiento">
                {getFieldDecorator("born", {
                  initialValue: moment(animals.animal.born, "YYYY/MM/DD"),
                  rules: [
                    {
                      required: true,
                      message: "Por favor ingrese el peso del animal."
                    }
                  ]
                })(
                  <DatePicker
                  // defaultValue={moment(animals.animal.born, "YYYY-MM-DD")}
                  // format={"YYYY/MM/DD"}
                  />
                )}
              </FormItem>

              <FormItem label="Estado ">
                {getFieldDecorator("state", {
                  initialValue: animals.animal.state,
                  rules: [
                    {
                      required: true,
                      message: "Por favor seleccione el estado del animal"
                    }
                  ]
                })(
                  <Select placeholder="Estado del animal">
                    <Option value="healthy">Saludable</Option>
                    <Option value="Sick">Enfermo</Option>
                  </Select>
                )}
              </FormItem>

              <Divider> </Divider>

              <FormItem>
                <Button type="primary" htmlType="submit" icon="edit">
                  Actualizar
                </Button>
                &nbsp; &nbsp;
                <Button icon="arrow-left" onClick={this.handleCancel}>
                  Cancelar
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

AnimalEdit.propTypes = {
  getAllTypeBreeds: PropTypes.func.isRequired, // Redux
  getAllTypeRhs: PropTypes.func.isRequired, // Redux
  getProfileAnimal: PropTypes.func.isRequired, // Redux
  updateAnimal: PropTypes.func.isRequired, // Redux
  updatePhotoAnimal: PropTypes.func.isRequired, // Redux
  breeds: PropTypes.object.isRequired, // Redux
  rhs: PropTypes.object.isRequired, // Redux
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  animals: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  error: state.error,
  rhs: state.rhs,
  breeds: state.breeds,
  animals: state.animals
});

export default connect(
  mapStateToProps,
  {
    getAllTypeBreeds,
    getAllTypeRhs,
    updateAnimal,
    getProfileAnimal,
    updatePhotoAnimal
  }
)(Form.create()(AnimalEdit));
