const facialExpressions = {
  default: {},

  // Happy expressions
  smile: {
    browInnerUp: 0.17,
    eyeSquintLeft: 0.40,
    eyeSquintRight: 0.44,
    noseSneerLeft: 0.17,
    noseSneerRight: 0.14,
    mouthPressLeft: 0.61,
    mouthPressRight: 0.41,
  },

  funnyFace: {
    jawLeft: 0.63,
    mouthPucker: 0.53,
    noseSneerLeft: 1.00,
    noseSneerRight: 0.39,
    mouthLeft: 1.00,
    eyeLookUpLeft: 1.00,
    eyeLookUpRight: 1.00,
    cheekPuff: 1.00,
    mouthDimpleLeft: 0.41,
    mouthRollLower: 0.32,
    mouthSmileLeft: 0.35,
    mouthSmileRight: 0.35,
  },

  // Sad expressions
  sad: {
    mouthFrownLeft: 1.00,
    mouthFrownRight: 1.00,
    mouthShrugLower: 0.78,
    browInnerUp: 0.45,
    eyeSquintLeft: 0.72,
    eyeSquintRight: 0.75,
    eyeLookDownLeft: 0.50,
    eyeLookDownRight: 0.50,
    jawForward: 1.00,
  },

  // Surprised expressions
  surprised: {
    eyeWideLeft: 0.50,
    eyeWideRight: 0.50,
    jawOpen: 0.00,
    mouthFunnel: 0.20,
    browInnerUp: 1.00,
  },

  // Angry expressions
  angry: {
    browDownLeft: 1.00,
    browDownRight: 1.00,
    eyeSquintLeft: 1.00,
    eyeSquintRight: 1.00,
    jawForward: 1.00,
    jawLeft: 1.00,
    mouthShrugLower: 1.00,
    noseSneerLeft: 1.00,
    noseSneerRight: 0.42,
    eyeLookDownLeft: 0.16,
    eyeLookDownRight: 0.16,
    cheekSquintLeft: 1.00,
    cheekSquintRight: 1.00,
    mouthClose: 0.23,
    mouthFunnel: 0.63,
    mouthDimpleRight: 1.00,
  },

  // Crazy expressions
  crazy: {
    browInnerUp: 0.90,
    jawForward: 1.00,
    noseSneerLeft: 0.57,
    noseSneerRight: 0.51,
    eyeLookDownLeft: 0.39,
    eyeLookUpRight: 0.40,
    eyeLookInLeft: 0.96,
    eyeLookInRight: 0.96,
    jawOpen: 0.96,
    mouthDimpleLeft: 0.96,
    mouthDimpleRight: 0.96,
    mouthStretchLeft: 0.28,
    mouthStretchRight: 0.29,
    mouthSmileLeft: 0.56,
    mouthSmileRight: 0.38,
    tongueOut: 0.96,
  },
};

export default facialExpressions;
