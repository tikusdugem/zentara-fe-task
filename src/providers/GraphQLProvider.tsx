"use client";

import { ReactNode } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const TREVORBLADES_API_URL = process.env.NEXT_PUBLIC_TREVORBLADES_API_URL;

const client = new ApolloClient({
  link: new HttpLink({ uri: TREVORBLADES_API_URL }),
  cache: new InMemoryCache(),
});

interface IGraphQLProviderProps {
  children: ReactNode;
}

const GraphQLProvider = ({ children }: IGraphQLProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default GraphQLProvider;
