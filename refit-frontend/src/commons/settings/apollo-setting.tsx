"use client"

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "http://main-practice.codebootcamp.co.kr/graphql",
    cache: new InMemoryCache(),
})

export default function ApolloSetting({pages}: {pages: React.ReactNode}){
    return(
        <ApolloProvider client={client}>
            {pages}
        </ApolloProvider>
    )
}