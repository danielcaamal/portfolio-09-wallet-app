import React from 'react'
import App from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from '@/utils/graphql'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>
  }
}

export default MyApp