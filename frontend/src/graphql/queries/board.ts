import { gql } from "@apollo/client";

export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      youtubeUrl
      images
      createdAt
      likeCount
      dislikeCount
      boardAddress {
        zipcode
        address
        addressDetail
      }
    }
  }
`;

export const FETCH_BOARDS = gql`
  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {
    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {
      _id
      writer
      title
      createdAt
      deletedAt
      images
      likeCount
    }
  }
`;

export const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {
    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)
  }
`;

export const FETCH_BOARDS_AND_COUNT = gql`
  query fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {
    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {
      _id
      writer
      title
      createdAt
      deletedAt
    }
    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)
  }
`;

export const FETCH_BOARD_COMMENTS = gql`
  query fetchBoardComments($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      createdAt
    }
  }
`;

export const FETCH_BOARDS_OF_THE_BEST = gql`
  query {
    fetchBoardsOfTheBest {
      images
      title
      writer
      likeCount
      createdAt
      _id
    }
  }
`;
