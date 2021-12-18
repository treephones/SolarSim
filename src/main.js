import * as GL from 'three';
import Planet from './planets/planet.js';

//scene properties
const scene = new GL.Scene();
const camera = new GL.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new GL.WebGL1Renderer({canvas: document.getElementById("ss")});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

