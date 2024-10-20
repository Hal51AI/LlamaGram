const visemesMapping = {
  // Vowels
  A: "viseme_aa", a: "viseme_aa",
  E: "viseme_E",  e: "viseme_E",
  I: "viseme_I",  i: "viseme_I",
  O: "viseme_O",  o: "viseme_O",
  U: "viseme_U",  u: "viseme_U",

  // Bilabial (lips together)
  B: "viseme_PP", b: "viseme_PP",
  M: "viseme_PP", m: "viseme_PP",
  P: "viseme_PP", p: "viseme_PP",

  // Labiodental (teeth and lip)
  F: "viseme_FF", f: "viseme_FF",
  V: "viseme_DD", v: "viseme_DD",

  // Alveolar (tongue to upper teeth or ridge)
  D: "viseme_DD", d: "viseme_DD",
  N: "viseme_nn", n: "viseme_nn",
  T: "viseme_TH", t: "viseme_TH",
  L: "viseme_RR", l: "viseme_RR",
  R: "viseme_RR", r: "viseme_RR",

  // Sibilant (hissing sounds)
  S: "viseme_SS", s: "viseme_SS",
  Z: "viseme_SS", z: "viseme_SS",
  X: "viseme_SS", x: "viseme_SS",

  // Velar (back of the tongue)
  G: "viseme_E",  g: "viseme_E",
  K: "viseme_kk", k: "viseme_kk",

  // Palato-alveolar (tongue close to the roof of the mouth)
  C: "viseme_CH", c: "viseme_CH",
  J: "viseme_CH", j: "viseme_CH",

  // Dental fricative
  H: "viseme_TH", h: "viseme_TH",

  // Special cases
  Q: "viseme_U",  q: "viseme_U",
  W: "viseme_U",  w: "viseme_U",
  Y: "viseme_U",  y: "viseme_U"
};

export default visemesMapping;
