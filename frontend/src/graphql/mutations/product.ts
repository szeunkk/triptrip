import { gql } from "@apollo/client";

export const CREATE_TRAVELPRODUCT = gql`
  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {
    createTravelproduct(createTravelproductInput: $createTravelproductInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      travelproductAddress {
        address
        addressDetail
        zipcode
        lat
        lng
      }
      seller {
        name
        picture
      }
    }
  }
`;

