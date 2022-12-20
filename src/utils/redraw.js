export const orangeBgColor = (...strings) => {
  return redrawText('orangeBgColor', strings);
}

export const greenBgColor = (...strings) => {
  return redrawText('greenBgColor', strings);
}

export const redBgColor = (...strings) => {
  return redrawText('redBgColor', strings);
}

export const orangeColor = (...strings) => {
  return redrawText('orangeColor', strings);
}

export const greenColor = (...strings) => {
  return redrawText('greenColor', strings);
}

export const redColor = (...strings) => {
  return redrawText('redColor', strings);
}

export const lightblueColor = (...strings) => {
  return redrawText('lightblueColor', strings);
}

export const reset = (...strings) => {
  return redrawText('reset', strings);
}

const redrawText = (color, strings) => {
  const style = {
    orangeBgColor: "\x1b[7m\x1b[33m",
    redBgColor: "\x1b[41m\x1b[37m\x1b[5m",
    greenBgColor: "\x1b[32m\x1b[7m",
    redColor: "\x1b[31m",
    greenColor: "\x1b[32m",
    orangeColor: "\x1b[33m",
    lightblueColor: "\x1b[36m",
    reset: "\x1b[0m"
  };

  return style[color] + strings.join('') + style.reset;
};