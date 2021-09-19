import abcjs from "abcjs";
import { useEffect, useState } from "react";
import {
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

type ScoreProps = {
  notes: string;
};

const myContext = new AudioContext();
const synth = new abcjs.synth.CreateSynth();

function Score({ notes }: ScoreProps) {
  const [beginPlaying, setBeginPlaying] = useState(false);
  const [tempo, setTempo] = useState(60);

  myContext.resume();

  useEffect(() => {
    let visualObj = abcjs.renderAbc("paper", notes, { responsive: "resize" });

    if (beginPlaying) {
      // some funky logic bc we can't tell if a play is in progress
      // should be fixed. the current issue is that
      // if i remove the check on loaded, it begins processing audio
      // as soon as the page loads, and then crashes
      synth
        .init({
          audioContext: myContext,
          visualObj: visualObj[0],
          millisecondsPerMeasure: 240000 / tempo, // assuming 4/4 but whatever
        })
        .then(() => {
          synth.prime().then(() => {
            synth.start();
          });
        });
    }
  }, [notes, beginPlaying, tempo]);

  return (
    <div>
      <div id="paper"></div>
      <Button
        color="blue"
        onClick={() => {
          setBeginPlaying(true);
        }}
        variant="outline"
      >
        Play
      </Button>
      <Button
        color="blue"
        onClick={() => {
          synth.pause();
        }}
        variant="outline"
      >
        Pause
      </Button>
      <Button
        color="blue"
        onClick={() => {
          synth.resume();
        }}
        variant="outline"
      >
        Resume
      </Button>
      <Button
        color="blue"
        onClick={() => {
          setBeginPlaying(false); // allows you to replay
          synth.stop();
        }}
        variant="outline"
      >
        Reset
      </Button>
      <Slider
        defaultValue={60}
        min={20}
        max={180}
        aria-label="slider-ex-5"
        onChangeEnd={(tempo) => setTempo(tempo)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <div>Current tempo: {tempo} bpm</div>
    </div>
  );
}

export default Score;
