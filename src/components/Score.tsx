import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";
import { useEffect } from "react";

type ScoreProps = {
  notes: string;
};

const synth = new abcjs.synth.CreateSynth();
const synthControl = new abcjs.synth.SynthController();
const cursorControl = {
  beatSubdivisions: 2,
  onStart: function () {
    console.log("The tune has started playing.");
  },
  onFinished: function () {
    console.log("The tune has stopped playing.");
  },
  onBeat: function (beatNumber: any) {
    console.log("Beat " + beatNumber + " is happening.");
  },
  onEvent: function (event: any) {
    console.log("An event is happening", event);
  },
};

function Score({ notes }: ScoreProps) {
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

  useEffect(() => {
    synthControl.load("#audio", cursorControl, {
      displayLoop: true,
      displayRestart: true,
      displayPlay: true,
      displayProgress: true,
      displayWarp: true,
    });
  }, []);

  return (
    <div>
      <div id="audio"></div>
      <div id="paper"></div>
    </div>
  );
}

export default Score;
