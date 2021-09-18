# composing.studio

This is the code for [composing.studio](https://composing.studio), a web
application that aims to make music composition collaborative and accessible to
everyone.

## Project Goals

- Right now it’s possible to write music in a textual format called ABC, which
  works for transcribing simple songs + guitar chords as well as some other
  pieces like chorales. It has some limitations, but not too many (someone has
  encoded a Beethoven symphony in ABC before!).
- Here’s an example of an interactive editor built with ABC:
  https://editor.drawthedots.com/. The editor is not that pretty (we would want
  to make something that looks nicer), but it gets the gist across.
- The minimum project would be to hook up this to a real-time collaborative text
  editor, then offer a site that lets people make + share collaborative editing
  sessions with music playback.

Additional stretch goals include:

- User interface specs, making features feel more smooth for users.
- A backend and database to let people share links to their songs, play back
  music, and see songs created recently (sorted by popularity or rating).
- Support for comments that let people make suggestions in the score.

## Getting Started

This application is built using a backend server written in Rust (to provide
collaborative editing support), as well as a frontend written in TypeScript
using React ([Create React App](https://create-react-app.dev/)).

Initially, the backend server has support for transient collaborative editing
sessions, and the frontend is the code for Rustpad, which simply offers a
collaborative code editor with cursors and live presence tracking.

To run this application, you need to install Rust, `wasm-pack`, and Node.js.
Then, build the WebAssembly portion of the app:

```
wasm-pack build cstudio-wasm
```

When that is complete, you can install dependencies for the frontend React
application:

```
npm install
```

Next, compile and run the backend web server:

```
cargo run
```

While the backend is running, open another shell and run the following command
to start the frontend portion.

```
npm start
```

This command will open a browser window to `http://localhost:3000`, with hot
reloading on changes.

## Milestones

Here are the rough milestones for the project:

- [ ] Create a minimum viable frontend interface for music editing, by hooking
      up [abcjs](https://www.abcjs.net/) or a similar library to Rustpad.
      Restyle the website to reflect these new UI changes.
- [ ] (Optional). Add a PostgreSQL database to the backend server, with support
      for saving documents and migrations. Implement sharing links to songs,
      publishing them, running SQL statements to see recent songs, and other
      social features.
- [ ] Build out a pretty landing page for the app that outlines its features.
- [ ] Handle logistical components for judging: create a demo video + Devpost
      link at time for HackMIT submission.

The first milestone is the minimum viable product. Along the way, the most
important things to focus on are _user experience_, _ease of use_, and
_intuitive design_.

## Contributing

We're using a single repository for this project. You should make branches on
this repository to add features and create a pull request when you're ready to
merge in your work. Please ask another person to look at your pull request
before your merge it.

We have continuous integration for this repository, which will check things like
code style (Prettier) and formatting (ESLint). The current state of the `main`
branch is automatically deployed to the production web server at
[composing.studio](https://composing.studio).
