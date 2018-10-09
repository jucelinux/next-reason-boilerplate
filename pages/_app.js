/* eslint camelcase: "off", react/jsx-no-undef: 0,  no-unused-vars: 0 */
import App, {Container} from "next/app";
import React from "react";
import {ApolloProvider} from "react-apollo";
import NextSeo from "next-seo";
import {LocaleProvider} from "antd";
import en_US from "antd/lib/locale-provider/en_US";

import {config, library as fontawesome} from "@fortawesome/fontawesome-svg-core";
import {faComments} from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import withApolloClient from "../apollo/with-apollo-client";
// import your default seo configuration
import SEO from "../next-seo.config";

config.autoAddCss = false;
fontawesome.add(faComments);


class MyApp extends App {
    render() {
        const {Component, pageProps, apolloClient} = this.props;
        return (
            <Container>
                <LocaleProvider locale={en_US}>
                    <ApolloProvider client={apolloClient}>
                        {/* Here we call NextSeo and pass our default configuration to it  */}
                        <NextSeo config={SEO}/>
                        <Component {...pageProps} />
                    </ApolloProvider>
                </LocaleProvider>
            </Container>
        );
    }
}

export default withApolloClient(MyApp);