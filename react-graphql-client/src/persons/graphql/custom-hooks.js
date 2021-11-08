import { ALL_PERSONS, FIND_PERSON } from "./queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_PERSON, EDIT_NUMBER } from "./mutations";

export const usePersons = () => {
  const result = useQuery(ALL_PERSONS);
  return result;
};

export const useCreatePerson = (notifyError) => {
  //mutation hook de apollo client y graphql
  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      notifyError(error.graphQLErrors[0].message);
    },
  });

  return [createPerson];
};

export const useFindPerson = () => {
  const [getPerson, result] = useLazyQuery(FIND_PERSON);

  return [getPerson, result];
};

export const useEditPerson = () => {
  //mutation hook de apollo client y graphql
  const [editPerson] = useMutation(EDIT_NUMBER);

  return [editPerson];
};
