import React, { Suspense } from "react";
import Parser from "html-react-parser";
import { Provider, atom, useAtom } from "jotai";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";
import { a, useSpring } from "@react-spring/web";

const postId = atom(9001);
const postData = atomWithQuery((get) => ({
  queryKey: ["post", get(postId)],
  queryFn: async ({ queryKey: [, id] }) => {
    await new Promise((r) => setTimeout(r, 1000)); // just a fake loading, it can be deleted
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return response.json();
  }
}));

function Id() {
  const id = useAtomValue(postId);
  const props = useSpring({ from: { id: 0 }, id, reset: true });
  return <a.h1>{props.id.to(Math.round)}</a.h1>;
}

function Next() {
  const set = useUpdateAtom(postId);
  return (
    <button onClick={() => set((x) => x + 1)}>
      <div>→</div>
    </button>
  );
}

function PostTitle() {
  const [{ by, title, url, text, time, kids }] = useAtom(postData);


  return (
    <>
      <h2>{by}</h2>
      <h6>{new Date(time * 1000).toLocaleDateString("en-US")}</h6>
      {title && <h4>{title}</h4>}
      <a href={url}>{url}</a>
      {text && <div>{Parser(text)}</div>}
      <br />

      <div className="container">
        <div className="card">
          <img src="https://images.unsplash.com/photo-1536323760109-ca8c07450053" alt={title} />
          <div className="card__details">
            {
              kids && kids.map((id) => (
                <span className="tag" key={id}>{ id }</span>
              ))
            }

            <span className="tag">{new Date(time * 1000).toLocaleDateString("en-US")}</span>
            <span className="name" style={{ fontWeight: "bolder", fontSize: "36px" }}>{title}</span>

            {text && <p>{Parser(text)}</p>}
            <button className="button" >Read More</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Provider>
      <Id />
      <div>
        <Suspense fallback={<h2>Loading...</h2>}>
          <PostTitle />
        </Suspense>
      </div>
      <Next />
    </Provider>
  );
}



// import React from 'react'
// import { useAtom, atom } from 'jotai'
// import { atomWithQuery } from 'jotai/query'

// const idAtom = atom(1)
// const userAtom = atomWithQuery((get) => ({
//   queryKey: ['users', get(idAtom)],
//   queryFn: async ({ queryKey: [, id] }) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//     return res.json()
//   },
// }))

// const App = () => {
//   // return (
//   //   <div className='test' dir='rtl'>
//   //     <div>އައްސަލާމް</div>
//   //     <div>އަލައިކުމް</div>
//   //   </div>
//   // )
// }

// export default App
