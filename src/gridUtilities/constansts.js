import batman from "../assets/Icons/batman.png";
import deathstroke from "../assets/Icons/deathstroke.png";
import greenlantern from "../assets/Icons/greenlantern.png";
import hulk from "../assets/Icons/hulk.png";
import ironman from "../assets/Icons/ironman.png";
import joker from "../assets/Icons/joker.png";
import lexluthor from "../assets/Icons/lexluthor.png";
import magneto from "../assets/Icons/magneto.png";
import mystique from "../assets/Icons/mystique.png";
import spiderman from "../assets/Icons/spiderman.png";
import superman from "../assets/Icons/superman.png";
import thanos from "../assets/Icons/thanos.png";
import flash from "../assets/Icons/flash.png";
import thor from "../assets/Icons/thor.png";
import wolverine from "../assets/Icons/wolverine.png";
import wonderwoman from "../assets/Icons/wonderwoman.png";
import question from "../assets/Icons/question.png";

export const iconsList = [
  "batman",
  "deathstroke",
  "greenlantern",
  "hulk",
  "ironman",
  "joker",
  "lexluthor",
  "magneto",
  "mystique",
  "spiderman",
  "superman",
  "thanos",
  "flash",
  "thor",
  "wolverine",
  "wonderwoman",
];

export function getShuffledIconsList() {
  const array = [...iconsList];
  return array.sort(() => Math.random() - 0.5);
}

export function getIconByName(name) {
  switch (name) {
    case "batman":
      return batman;
    case "deathstroke":
      return deathstroke;
    case "greenlantern":
      return greenlantern;
    case "hulk":
      return hulk;
    case "ironman":
      return ironman;
    case "joker":
      return joker;
    case "lexluthor":
      return lexluthor;
    case "magneto":
      return magneto;
    case "mystique":
      return mystique;
    case "spiderman":
      return spiderman;
    case "superman":
      return superman;
    case "thanos":
      return thanos;
    case "flash":
      return flash;
    case "thor":
      return thor;
    case "wolverine":
      return wolverine;
    case "wonderwoman":
      return wonderwoman;
    case "question":
      return question;
    default:
      return null;
  }
}
