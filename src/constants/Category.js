/**
 * All possible categories
 */
export const PROGRAMMING_LANGUAGE = 'programming-language'
export const THEORY = 'theory'
export const FRAMEWORK = 'framework'
export const TOOL = 'tool'
export const SHELL = 'shell'
export const BUSINESS = 'business'
export const DATA = 'data'
export const OTHER = 'other'

export const mapCategoryToWord = {
  [PROGRAMMING_LANGUAGE]: 'Programming Language',
  [THEORY]: 'Theory',
  [FRAMEWORK]: 'Framework',
  [TOOL]: 'Tool',
  [SHELL]: 'Shell',
  [BUSINESS]: 'Business',
  [DATA]: 'Data',
  [OTHER]: 'Other',
}

export const mapCategoryToShortHand = {
  [PROGRAMMING_LANGUAGE]: '💻',
  [THEORY]: '✍️',
  [FRAMEWORK]: '🍱',
  [TOOL]: '🛠',
  [SHELL]: '🗞',
  [BUSINESS]: '📈',
  [DATA]: '🔢',
  [OTHER]: '🤷‍♀️',
}

export const mapCategoryToColor = {
  [PROGRAMMING_LANGUAGE]: '#fffbe6',
  [THEORY]: '#fde0e0',
  [FRAMEWORK]: '#d6ffe1',
  [TOOL]: '#f0efff',
  [SHELL]: '#fce4ff',
  [BUSINESS]: '#d4f5f7',
  [DATA]: '#ffeed9',
  [OTHER]: '#0099ff',
}
