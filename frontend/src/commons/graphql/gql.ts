/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": typeof types.CreateBoardDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": typeof types.DeleteBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": typeof types.UpdateBoardDocument,
    "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": typeof types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": typeof types.UpdateBoardCommentDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": typeof types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": typeof types.DislikeBoardDocument,
    "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n": typeof types.LoginUserDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n    }\n  }\n": typeof types.CreateUserDocument,
    "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      balance\n    }\n  }\n": typeof types.CreatePointTransactionOfLoadingDocument,
    "\n  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n": typeof types.CreateTravelproductDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": typeof types.FetchBoardDocument,
    "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n      images\n      likeCount\n    }\n  }\n": typeof types.FetchBoardsDocument,
    "\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": typeof types.FetchBoardsCountDocument,
    "\n  query fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n    }\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": typeof types.FetchBoardsAndCountDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": typeof types.FetchBoardCommentsDocument,
    "\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n": typeof types.UploadFileDocument,
    "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      tags\n      pickedCount\n      price\n      seller {\n        _id\n        name\n        picture\n      }\n      images\n    }\n  }\n": typeof types.FetchTravelproductsDocument,
    "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n": typeof types.FetchTravelproductDocument,
};
const documents: Documents = {
    "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n": types.CreateBoardDocument,
    "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n": types.DeleteBoardDocument,
    "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.UpdateBoardDocument,
    "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.CreateBoardCommentDocument,
    "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.UpdateBoardCommentDocument,
    "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n": types.LikeBoardDocument,
    "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n": types.DislikeBoardDocument,
    "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n": types.LoginUserDocument,
    "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      balance\n    }\n  }\n": types.CreatePointTransactionOfLoadingDocument,
    "\n  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n": types.CreateTravelproductDocument,
    "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n": types.FetchBoardDocument,
    "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n      images\n      likeCount\n    }\n  }\n": types.FetchBoardsDocument,
    "\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": types.FetchBoardsCountDocument,
    "\n  query fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n    }\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n": types.FetchBoardsAndCountDocument,
    "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n": types.FetchBoardCommentsDocument,
    "\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n": types.UploadFileDocument,
    "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      tags\n      pickedCount\n      price\n      seller {\n        _id\n        name\n        picture\n      }\n      images\n    }\n  }\n": types.FetchTravelproductsDocument,
    "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n": types.FetchTravelproductDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"): (typeof documents)["\n  mutation createBoard($createBoardInput: CreateBoardInput!) {\n    createBoard(createBoardInput: $createBoardInput) {\n      _id\n      writer\n      title\n      contents\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation deleteBoard($boardId: ID!) {\n    deleteBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String, $boardId: ID!) {\n    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createBoardComment($createBoardCommentInput: CreateBoardCommentInput!, $boardId: ID!) {\n    createBoardComment(createBoardCommentInput: $createBoardCommentInput, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation updateBoardComment(\n    $updateBoardCommentInput: UpdateBoardCommentInput!\n    $password: String\n    $boardCommentId: ID!\n  ) {\n    updateBoardComment(\n      updateBoardCommentInput: $updateBoardCommentInput\n      password: $password\n      boardCommentId: $boardCommentId\n    ) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation likeBoard($boardId: ID!) {\n    likeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"): (typeof documents)["\n  mutation dislikeBoard($boardId: ID!) {\n    dislikeBoard(boardId: $boardId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation loginUser($password: String!, $email: String!) {\n    loginUser(password: $password, email: $email) {\n      accessToken\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($createUserInput: CreateUserInput!) {\n    createUser(createUserInput: $createUserInput) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      balance\n    }\n  }\n"): (typeof documents)["\n  mutation createPointTransactionOfLoading($paymentId: ID!) {\n    createPointTransactionOfLoading(paymentId: $paymentId) {\n      _id\n      impUid\n      balance\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createTravelproduct($createTravelproductInput: CreateTravelproductInput!) {\n    createTravelproduct(createTravelproductInput: $createTravelproductInput) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchBoard($boardId: ID!) {\n    fetchBoard(boardId: $boardId) {\n      _id\n      writer\n      title\n      contents\n      youtubeUrl\n      images\n      createdAt\n      likeCount\n      dislikeCount\n      boardAddress {\n        zipcode\n        address\n        addressDetail\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n      images\n      likeCount\n    }\n  }\n"): (typeof documents)["\n  query fetchBoards($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n      images\n      likeCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"): (typeof documents)["\n  query fetchBoardsCount($endDate: DateTime, $startDate: DateTime, $search: String) {\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n    }\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"): (typeof documents)["\n  query fetchBoardsAndCount($endDate: DateTime, $startDate: DateTime, $search: String, $page: Int) {\n    fetchBoards(endDate: $endDate, startDate: $startDate, search: $search, page: $page) {\n      _id\n      writer\n      title\n      createdAt\n      deletedAt\n    }\n    fetchBoardsCount(endDate: $endDate, startDate: $startDate, search: $search)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query fetchBoardComments($page: Int, $boardId: ID!) {\n    fetchBoardComments(page: $page, boardId: $boardId) {\n      _id\n      writer\n      contents\n      rating\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n"): (typeof documents)["\n    mutation uploadFile($file: Upload!){\n        uploadFile(file: $file){\n            url\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      tags\n      pickedCount\n      price\n      seller {\n        _id\n        name\n        picture\n      }\n      images\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproducts($isSoldout: Boolean, $search: String, $page: Int) {\n    fetchTravelproducts(isSoldout: $isSoldout, search: $search, page: $page) {\n      _id\n      name\n      remarks\n      tags\n      pickedCount\n      price\n      seller {\n        _id\n        name\n        picture\n      }\n      images\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n"): (typeof documents)["\n  query fetchTravelproduct($travelproductId: ID!) {\n    fetchTravelproduct(travelproductId: $travelproductId) {\n      _id\n      name\n      remarks\n      contents\n      price\n      tags\n      images\n      pickedCount\n      travelproductAddress {\n        address\n        addressDetail\n        zipcode\n        lat\n        lng\n      }\n      seller {\n        name\n        picture\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;