import { gql } from '@apollo/client';

export const PDF_ITEM_CREATED_SUBSCRIPTION = gql`
  subscription ItemCreated {
    pdfItemCreated 
  }
`;

export const PDF_ITEM_UPDATED_SUBSCRIPTION = gql`
  subscription ItemUpdated {
    pdfItemUpdated{
      id
      userId
      title
      pages
      status
      markdown
      imageLink
      pdfBuffer
    }
  }
`;

export const INVITE_CREATED_SUBSCRIPTION = gql`
  subscription InvitiedCreated {
    inviteCreated{
      userId
    title
    friendId
    acceptance
    }
  }
`;

export const NOTE_CREATED_SUBSCRIPTION = gql`
  subscription NoteHandled {
    noteHandled{
      userId
      title
      message
    }
  }
`;