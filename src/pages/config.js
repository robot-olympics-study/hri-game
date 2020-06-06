import { robot_actions1 as robot_actionsAB} from './robot_actions1.js';
import { robot_actionsA } from './robot_actionsA.js';
import { robot_actionsB } from './robot_actionsB.js';
import { robot_actionsBA } from './robot_actionsBA.js';

const rewards1 = [1.0, 3.0, 2.5, 2.0]
const rewards2 = [8.0, 10.0, 7.5, 6.0]
const rewards3 = [10.0, 10.0, 25.0, 7.0]
const rewards4 = [3.0, 4.0, 5.0, 2.0]
const rewards5 = [6.0, 5.0, 20.0, 5.0]
const rewards = [rewards1, rewards2, rewards3, rewards4, rewards5]

const success1 = [1, 1, 0, 1]
const success2 = [0, 1, 1, 1]
const success3 = [1, 1, 0, 1]
const success4 = [1, 0, 0, 1]
const success5 = [1, 1, 0, 1]
const successes = [success1, success2, success3, success4, success5]

const videos = [
  ['https://youtu.be/nhygk6tfxwY', 'https://youtu.be/U4VZreSaoD8', 'https://youtu.be/3QSoHLZi-04', 'https://youtu.be/eCYaAl4A1do'],
  ['https://youtu.be/8Y9KRuk1knY', 'https://youtu.be/DsylI17drwo', 'https://youtu.be/GKLkLg97Z-Y', 'https://youtu.be/aOqkfVtcXQM'],
  ['https://youtu.be/IOXn8A5EI7Q', 'https://youtu.be/rm4w5o4HnGk', 'https://youtu.be/AUdG5_rmx9M', 'https://youtu.be/QkJiRCapgUc'], 
  ['https://youtu.be/bOXhhWrgezo', 'https://youtu.be/afBC1nnR3Tg', 'https://youtu.be/5kKwR_tmu-s', 'https://youtu.be/0KMx_1-FU-s'], 
  ['https://youtu.be/a5w7cL3qbxQ', 'https://youtu.be/ntOPYEcG0gY', 'https://youtu.be/8uMbwh7WgG8', 'https://youtu.be/Iu7rha1YL5M']]

const rooms = {
    0: 'Room A',
    1: 'Room B',
    2: 'Room C',
    3: 'Room D',
  }

// BEGIN SET TREATMENT 
var TREATMENT = 'BA'
/* Example of random treatment. Not compatible with restarting from cookies.
if (Math.random() > 0.5) {
  TREATMENT = 'AB'
} */
// END SET TREATMENT

// Don't modify code below here
var robot_strategy = null;
var roomList = [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15], [16,17,18,19]];
var roomOrder = null;
var MAX_ROOMS = null;

if (TREATMENT === 'AB') {
  robot_strategy = robot_actionsAB;
  roomOrder = [0, 1, 2, 3, 4];
  MAX_ROOMS = 5;
} else if (TREATMENT === 'A') {
  robot_strategy = robot_actionsA;
  roomOrder = [0, 1, 2];
  MAX_ROOMS = 3;
} else if (TREATMENT === 'B') {
  robot_strategy = robot_actionsB;
  roomOrder = [3, 4];
  MAX_ROOMS = 2;
} else if (TREATMENT === 'BA') {
  robot_strategy = robot_actionsBA;
  roomOrder = [3, 4, 0, 1, 2];
  MAX_ROOMS = 5;
}

export {rewards, successes, videos, rooms, robot_strategy, roomOrder, roomList, MAX_ROOMS, TREATMENT};