import { useState } from 'react'
import logo from './logo.svg'
// import './App.css'
import {useEvent, useGate, useStore, useStoreMap} from "effector-react";
import {$authors, $extras, Author, Gate, getExtras, toggleExtras} from "./model";

function App() {
  const authors = useStore($authors)

  useGate(Gate)

  if (!authors) return <div>wait authors</div>

  return (
    <div className="App">
      {authors.map(author => <AuthorPanel key={author.name} author={author}/>)}
    </div>
  )
}

function AuthorPanel({author}: {author: Author}) {
  const toggleExtrasFn = useEvent(toggleExtras)

  return <div>
    <div>Name: {author.name}</div>
    <button onClick={() => toggleExtrasFn(author)}>toggle extras</button>
    <AuthorExtras author={author}/>
  </div>
}

function AuthorExtras({author}: {author: Author}) {
  const extras = useStoreMap($extras, e => e[author.name] ?? null)

  if (!extras) return <div>Wait extras of {author.name}</div>

  return <div>Extras of {author.name} is {extras.reverse}</div>
}

export default App
