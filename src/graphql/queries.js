import { gql } from '@apollo/client';

export const SIGNUP_QUERY = gql`
  query SIGNUP_QUERY($input:signupInput){
    signupQuery(input:$input)
  }
`;

export const LOGIN_QUERY = gql`
  query LOGIN_QUERY($input:loginInput){
    loginQuery(input:$input)
  }
`;

export const NOTE_QUERY = gql`
  query NOTE_QUERY($input:noteInput){
    noteQuery(input:$input)
  }
`;

export const INVITE_QUERY = gql`
  query INVITE_QUERY($input:noteInput){
    inviteQuery(input:$input)
  }
`;

export const GET_PDF_ITEMS_QUERY = gql`
query GET_ITEMS_QUERY($input:noteInfoInput){
  pdfitems(input:$input){
    id,
    userId,
    title,
    pages,
    status,
    markdown,
    imageLink,
    pdfBuffer,
    imageLink
    }
  }
`;
