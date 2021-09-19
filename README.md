# composing.studio

This is the code for [composing.studio](https://composing.studio/), a web
application that aims to make music composition collaborative and accessible to
everyone.

## Rationale

- Right now it’s possible to write music in a textual format called ABC, which
  works for transcribing simple songs + guitar chords as well as some other
  pieces like chorales. It has some limitations, but not too many (someone has
  encoded a Beethoven symphony in ABC before!).
- Here’s an example of an interactive editor built with ABC:
  https://editor.drawthedots.com/. The editor is fairly basic and not super
  user-friendly, but it showcases the utility and interest in this space.
- We provide a friendly and intuitive web-based interface for editing ABC music
  notation, with syntax highlighting, live preview, audio playback, and
  real-time collaboration. Anyone can create a new collaborative session by
  entering our website, and they can share the link with fellow composers to
  work together and come up with new ideas.

## Getting Started

This application is built using a backend operational transformation control
server written in Rust (to provide collaborative editing support), as well as a
frontend written in TypeScript using React
([Create React App](https://create-react-app.dev/)).

The backend server has support for transient collaborative editing sessions, and
the frontend offers a collaborative text editor with custom Monarch ABC syntax
highlighting, cursors, and live presence tracking. These parts of the
application are connected by WebSocket communication.

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

Here are the milestones for the project:

- [x] Create an easy-to-use and accessible frontend interface for music editing,
      by hooking up [abcjs](https://www.abcjs.net/) or a similar library to an
      OT-based collaborative text editing backend.
- [x] Build out a pretty landing page for the app that outlines its features.
- [x] Handle logistical components for judging: create a demo video + examples
      of use at time for HackMIT submission.

The first milestone is the minimum viable product. Along the way, the most
important things to focus on are _user experience_, _ease of use_, and
_intuitive design_.

## Contributing

We're using a single repository for this project. You should make branches on
this repository to add features and create a pull request when you're ready to
merge in your work. Please ask another person to look at your pull request
before you merge it.

We have continuous integration for this repository, which will check things like
code style (Prettier, Rustfmt) and successful build (Docker). The current state
of the `main` branch is continuously deployed to the production web server at
[composing.studio](https://composing.studio/).
