import React from 'react';

import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Deck from './utils/styled-markdown-deck';
import Menu from './utils/menu';

const LoadableDeck = ({ match }) => {
  const topic = (match && match.params.topic) || 'about-the-course';
  const [content, setContent] = React.useState();
  React.useEffect(() => {
    topic && import(`../topics/${topic}.md`)
      .catch(error => import('./error.md'))
      .then(loadedContent =>
        fetch(loadedContent.default)
          .then(res => res.text()))
          .then(loadedContent => {
        setContent(loadedContent);
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
    <BrowserRouter>
      <React.Fragment>
      <Route component={Menu} />
      <Switch>
        <Route path="/:topic" component={LoadableDeck} />
        <Redirect exact from="/" to="/about-the-course/" />
      </Switch>
    </React.Fragment>
  </BrowserRouter>);
};
