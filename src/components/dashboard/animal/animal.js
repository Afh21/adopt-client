import React, { Component } from "react";
import { List, Avatar, Icon, Button } from "antd";

let listData = [
  {
    href: "http://ant.design",
    title: `Ruby`,
    avatar:
      "https://misanimales.com/wp-content/uploads/2015/06/perro-collie-corriendo.jpg",
    description: "Raza (Criollo) - Edad (2 años) - Genero (Hembra)",
    content: "Perra rescatada de un hogar donde era maltratada por su dueño. "
  },
  {
    href: "http://ant.design",
    title: `Thomas`,
    avatar: "https://www.mundoperro.net/wp-content/uploads/Beagle1.jpg",
    description: "Raza (Beagle) - Edad (1 años) - Genero (Macho)",
    content: "Perro abandonado por sus cuidadores recién nacido. "
  },
  {
    href: "http://ant.design",
    title: `Canela`,
    avatar:
      "https://1.bp.blogspot.com/-clU2vEQpugk/UTkVUlAM1ZI/AAAAAAAAsL4/0OFm2cnT6uE/s1600/labrador-blond.jpg",
    description: "Raza (Labrador) - Edad (3 años) - Genero (Hembra)",
    content:
      "Perra abandonada por sus cuidadores y rescatadas de las calles del bronx"
  },
  {
    href: "http://ant.design",
    title: `Toby`,
    avatar:
      "https://1.bp.blogspot.com/-clU2vEQpugk/UTkVUlAM1ZI/AAAAAAAAsL4/0OFm2cnT6uE/s1600/labrador-blond.jpg",
    description: "Raza (Labrador) - Edad (3 años) - Genero (Macho)",
    content:
      "Perro abandonada por sus cuidadores y rescatadas de las calles del bronx"
  }
];

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class Animal extends Component {
  state = {
    animals: []
  };

  componentDidMount = () => {
    this.setState({
      animals: listData
    });
  };

  render() {
    const { animals } = this.state;
    return (
      <div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3
          }}
          dataSource={animals}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[
                <IconText type="star-o" text="100" />,
                <IconText type="like-o" text="120" />,
                <IconText type="message" text="1" />,
                <Button type="primary" ghost>
                  {" "}
                  Adoptame!{" "}
                </Button>
              ]}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={`${item.avatar}`}
                  style={{ borderRadius: 8, height: 150, width: 200 }}
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default Animal;
