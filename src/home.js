import React from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Deck from './utils/styled-markdown-deck';

const fetchTopic = topic => {
  return import(`../topics/${topic}.md`)
};

const useTopic = () => {
  const [name, loadTopic] = React.useState();
  const [content, setContent] = React.useState();
  React.useEffect(() =>
    name && fetchTopic(name).then(loadedContent => setContent(loadedContent.default))
  , [name]);

  return { name, content, loadTopic };
};

export default () => {
  const { name, content, loadTopic } = useTopic();
  return (<React.Fragment>
    Topic Name: {name}
    <div id="test123">
      <button onClick={() => { loadTopic('about-the-course')}}>course</button>
      <button onClick={() => { loadTopic('links')}}>links</button>
      <button onClick={() => { loadTopic('code')}}>code</button>
    </div>
    <Deck slides={content} />
  </React.Fragment>);
};
