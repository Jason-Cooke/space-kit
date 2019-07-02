/** @jsx jsx */
import { jsx } from "@emotion/core";
import React, { ComponentProps } from "react";
import { storiesOf } from "@storybook/react";
import { Button } from "./Button";
import { colors } from ".";
import * as typography from "./typography";
import { Table } from "./Table";

interface User {
  name: string;
  email: string;
  image: string;
  dateAdded: string;
}

const users: User[] = [
  {
    name: "Aria Stark",
    email: "ari@stark.com",
    image:
      "https://pm1.narvii.com/7105/5ba482037db5f9296a9053be20ead21c61e554cer1-711-750v2_128.jpg",
    dateAdded: "05/25/2019"
  },
  {
    name: "Sansa Stark",
    email: "sans@stark.com",
    image:
      "https://img.thedailybeast.com/image/upload/dpr_2.0/c_crop,h_1471,w_1471,x_230,y_0/c_limit,w_128/d_placeholder_euli9k,fl_lossy,q_auto/v1555501431/190415-Leon-Sansa-Stark-tease-_m4gdvf",
    dateAdded: "05/25/2019"
  }
];

storiesOf("Space Kit", module)
  .addParameters({
    options: {
      showPanel: false
    }
  })
  .add("Table", () => (
    <Table<User>
      // data is an array of type user (defined as a generic)
      data={users}
      columns={[
        {
          render: ({ image }) => (
            <img css={{ width: 48, height: 48 }} src={image} />
          )
        },
        {
          name: "description",
          render: ({ name, email }) => (
            <React.Fragment>
              <div>{name}</div>
              <div>{email}</div>
            </React.Fragment>
          )
        },
        {
          name: "Date Added",
          render: ({ dateAdded }) => dateAdded
        }
      ]}
    />
  ));
