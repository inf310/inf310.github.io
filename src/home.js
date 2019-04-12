import React from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Deck from './utils/styled-markdown-deck';
import Menu from './utils/menu';

const defaultToErrorSlide = err => ({
  default: `🤕 Something went wrong \n\n ${err} \n\n [Go to course home](/fullstack-js/)`
});

const LoadableDeck = ({ match }) => {
  const topic = (match && match.params.topic) || 'about-the-course';
  const [content, setContent] = React.useState();
  React.useEffect(() => {
    topic && import(`../topics/${topic}.md`)
      .catch(defaultToErrorSlide)
      .then(loadedContent => {
        setContent(loadedContent.default);
        document.title = `INF310: ${topic}`;
        const hash = window.location.hash.length < 2
          ? '#/0'
          : window.location.hash;

        window.location.hash = hash;
      });
  }, [topic]);

  return <Deck
    key={topic}
    slides={content}
  />
}

export default () => {
  return (
    <BrowserRouter basename="/fullstack-js">
      <React.Fragment>
      <Route component={Menu} />
      <Switch>
        <Route path="/:topic" component={LoadableDeck} />
        <Redirect exact from="/" to="/about-the-course/" />
      </Switch>
    </React.Fragment>
  </BrowserRouter>);
};
