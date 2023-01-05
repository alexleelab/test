import { gql } from '@apollo/client';

export const CREATE_PDF_MUTATION = gql`
  mutation CreatePdfItem($input: CreatePdfItemInput!) {
    createPdfItem(input: $input)
  }
`;

export const UPDATE_PDF_MUTATION = gql`
  mutation UpdatePdfItem($input: UpdatePdfItemInput!) {
    updatePdfItem(input: $input)
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input)
  }
`;

export const INVITE_MUTATION = gql`
  mutation Invite($input: inviteInput!) {
    invite(input: $input)
  }
`;

export const HANDLE_INVITE_MUTATION = gql`
  mutation HandleInvite($input: inviteInput!) {
    handleInvite(input: $input)
  }
`;

export const CREATE_NEW_NOTE_MUTATION = gql`
  mutation CreateNewNote($input: createNewNoteInput!) {
    createNewNote(input: $input)
  }
`;

export const DELETE_NOTE_MUTATION =gql`
  mutation DeleteNewNote($input:createNewNoteInput!){
    deleteNote(input:$input)
  }
`

export const DELETE_ITEM_MUTATION =gql`
  mutation DeleteItem($input:deleteItemInput!){
    deleteItem(input:$input)
  }
`