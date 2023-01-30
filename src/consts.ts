import { greenText, yellowText } from '../utils/customizedLog';
import { CommandEnum } from './typing';

export const INPUT_ERROR_EN = 'Invalid parameter.You can use --help to get all valid parameters.';

export const INPUT_ERROR_FR = "Le paramèter est invalide. Vous pouvez essayer d'entrer --help à afficher tous les commands";

export const NONE_FOUND_TXT = 'NONE FOUND';
export const NONE_FOUND_MSG = yellowText(NONE_FOUND_TXT);

const COUNT_TEXT = '--' + CommandEnum.COUNT;
const FILTER_TEXT = `--${CommandEnum.FILTER}=pattern`;
export const HELP_MESSAGE_TXT_EN =
  `${COUNT_TEXT} can count the number of people and animals, and ${FILTER_TEXT} can only display the animales matching the pattern`;
export const HELP_MESSAGE_EN = greenText(HELP_MESSAGE_TXT_EN);
  
export const HELP_MESSAGE_TXT_FR =
  `${COUNT_TEXT} peut compter le nombre de personnes et animals, et ${FILTER_TEXT} peut uniquement montrer les animals en correspondant le pattern`;
export const HELP_MESSAGE_FR = greenText(HELP_MESSAGE_TXT_FR);
