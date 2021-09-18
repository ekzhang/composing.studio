import abcjs from "abcjs";
import { useEffect, useState } from "react";

type ScoreProps = {
  notes: string;
};

function Score({ notes }: ScoreProps) {
  const synth = new abcjs.synth.CreateSynth();
  const myContext = new AudioContext();
  const synthControl = new abcjs.synth.SynthController(); // not used, but required for pause/resume functionality

  const [loaded, setLoaded] = useState(false);
  const [beginPlaying, setBeginPlaying] = useState(false);

  useEffect(() => {
    if (loaded) {
      // documentation says to do this in case the browser bans immediate audio playing. may not be necessary
      myContext.resume();
    }
  }, [loaded]);

  useEffect(() => {
    let visualObj = abcjs.renderAbc("paper", notes, {});

    if (loaded && beginPlaying) {
      // some funky logic bc we can't tell if a play is in progress
      // should be fixed. the current issue is that
      // if i remove the check on loaded, it begins processing audio 
      // as soon as the page loads, and then crashes
      synth
        .init({
          audioContext: myContext,
          visualObj: visualObj[0],
          millisecondsPerMeasure: 2000, // we can add a slider to let user change tempo
          options: {
            soundFontUrl: "https:/path/to/soundfont/folder",
          },
        })
        .then(() => {
          synth.prime().then(() => {
            synth.start();
          });
        });
    }
  }, [notes, loaded, beginPlaying]);

  return (
    <div>
      <div id="paper"></div>
      <button
        onClick={() => {
          setBeginPlaying(true);
          setLoaded(true);
        }}
      >
        Play
      </button>
      <button
        onClick={() => {
          synth.pause();
        }}
      >
        Pause
      </button>
      <button
        onClick={() => {
          synth.resume();
        }}
      >
        Resume
      </button>
      <button
        onClick={() => {
          setBeginPlaying(false); // allows you to replay
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Score;
