import { gql, ApolloServer, UserInputError } from "apollo-server";
import { v4 as uuid } from "uuid";

const persons = [
  {
    name: "Jhosep",
    phone: "993541937",
    street: "Av universitaria 6599",
    city: "Lima",
    id: "1",
  },
  {
    name: "Geyvi",
    phone: "993541960",
    street: "Av universitaria 999",
    city: "Lima",
    id: "2",
  },
  {
    name: "Atenea",
    phone: null,
    street: "Av universitaria 6599 Urb Santa Luzmila",
    city: "Lima",
    id: "3",
  },
  {
    name: "Fanny",
    phone: "993541999",
    street: "Av universitaria 9090",
    city: "Lima",
    id: "4",
  },
];

//Definiciones de datos gql
const typeDefs = gql`
  enum YesNo {
    YES
    NO
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person

    editNumber(
      name: String!, 
      phone: String!
    ): Person
  }
`;

//Resolvers de datos gql
const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) return persons;

      const byPhone = (person) =>
        args.phone === "YES" ? person.phone : !person.phone;

      return persons.filter(byPhone);
    },
    findPerson: (root, args) => {
      const { name } = args;
      return persons.find((person) => person.name === name);
    },
  },
  //agregar o modificar los matchs de propiedades y tipos de graphql en Apollo ,
  // se pone "Person" porque el type tambien se llama "Person"
  Person: {
    address: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },

  //mutations son metodos que van a mutar la data existe (agregar, borrar, editar, crear)
  Mutation: {
    addPerson: (root, args) => {
      if (persons.find((p) => p.name === args.name)) {
        throw new UserInputError("Name must be unique", {
          invalidArgs: args.name,
        });
      }

      const person = { ...args, id: uuid() };
      persons.push(person);
      return person;
    },

    editNumber: (root, args) => {
      const personIndex = persons.findIndex((p) => p.name === args.name);

      if (personIndex === -1) return null;

      const updatedPerson = { ...persons[personIndex], phone: args.phone };

      persons[personIndex] = updatedPerson;

      return updatedPerson;
    },
  },
};

//Conexion con Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
