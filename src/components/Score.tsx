import { useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";

class CursorControl {
  // This demonstrates two methods of indicating where the music is.
  // 1) An element is created that is moved along for each note.
  // 2) The currently being played note is given a class so that it can be transformed.
  private cursor: SVGLineElement | null = null; // This is the svg element that will move with the music.

  constructor(private readonly rootSelector: string) {}

  onStart() {
    // This is called when the timer starts so we know the svg has been drawn by now.
    // Create the cursor and add it to the sheet music's svg.
    const svg = document.querySelector(this.rootSelector + " svg");
    this.cursor = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    this.cursor.setAttribute("class", "abcjs-cursor");
    this.cursor.setAttributeNS(null, "x1", "0");
    this.cursor.setAttributeNS(null, "y1", "0");
    this.cursor.setAttributeNS(null, "x2", "0");
    this.cursor.setAttributeNS(null, "y2", "0");
    svg?.appendChild(this.cursor);
  }

  removeSelection() {
    // Unselect any previously selected notes.
    var lastSelection = document.querySelectorAll(
      this.rootSelector + " .abcjs-highlight"
    );
    for (var k = 0; k < lastSelection.length; k++)
      lastSelection[k].classList.remove("abcjs-highlight");
  }

  onEvent(ev: any) {
    // This is called every time a note or a rest is reached and contains the coordinates of it.
    if (ev.measureStart && ev.left === null) return; // this was the second part of a tie across a measure line. Just ignore it.

    this.removeSelection();

    // Select the currently selected notes.
    for (var i = 0; i < ev.elements.length; i++) {
      var note = ev.elements[i];
      for (var j = 0; j < note.length; j++) {
        note[j].classList.add("abcjs-highlight");
      }
    }

    // Move the cursor to the location of the current note.
    if (this.cursor) {
      this.cursor.setAttribute("x1", String(ev.left - 2));
      this.cursor.setAttribute("x2", String(ev.left - 2));
      this.cursor.setAttribute("y1", ev.top);
      this.cursor.setAttribute("y2", ev.top + ev.height);
    }
  }

  onFinished() {
    this.removeSelection();

    if (this.cursor) {
      this.cursor.setAttribute("x1", "0");
      this.cursor.setAttribute("x2", "0");
      this.cursor.setAttribute("y1", "0");
      this.cursor.setAttribute("y2", "0");
    }
  }
}

const synth = new abcjs.synth.CreateSynth();
const synthControl = new abcjs.synth.SynthController();
const cursorControl = new CursorControl("#paper");

type ScoreProps = {
  notes: string;
  darkMode: boolean;
};

function Score({ notes, darkMode }: ScoreProps) {
  useEffect(() => {
    synthControl.load("#audio", cursorControl, {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true,
    });
  }, []);

  useEffect(() => {
    let visualObj = abcjs.renderAbc("paper", notes, {
      responsive: "resize",
      add_classes: true,
    });

    synth
      .init({ visualObj: visualObj[0] })
      .then(function () {
        synthControl
          .setTune(visualObj[0], false, { chordsOff: false })
          .then(function () {
            console.log("Audio successfully loaded.");
          })
          .catch(function (error: any) {
            console.warn("Audio problem:", error);
          });
      })
      .catch(function (error: any) {
        console.warn("Audio problem:", error);
      });
  }, [notes]);

  // TODO: Make this component reusable by generating random unique IDs.
  return (
    <Stack p={3}>
      <Box
        id="paper"
        borderWidth="1px"
        borderColor="gray.500"
        rounded="sm"
        bgColor={darkMode ? "whiteAlpha.900" : "initial"}
      />
      <Box id="audio" />
    </Stack>
  );
}

export default Score;
