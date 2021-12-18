import * as GL from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Planet from './planets/planet.js';
import planetData from './planets/planets.json';

var getDefaultPlanets = ()  => {
    let planets = [];
    for(const planet of planetData) {
        planets.push(new Planet(planet.name, planet.mass, planet.radius, planet.rotationVelocity, planet.orbitVelocity, [sun, planet.sunDistance], planet.texturePath));
    }
    return planets;
}

var canvas = document.getElementById("ss");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//scene properties
const scene = new GL.Scene();
const camera = new GL.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new GL.WebGLRenderer({canvas: canvas});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const orbitController = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 140, 140);
orbitController.update();

scene.add(new GL.AmbientLight(0x333333));

const starbox = './textures/starbox.jpg';
const skyBoxLoader = new GL.CubeTextureLoader();
scene.background = skyBoxLoader.load([starbox,starbox,starbox,starbox,starbox,starbox]);

let sun = new Planet("Sun", 0, 15, 0.004, 0, undefined, './textures/sunmap.jpg');
const planets = getDefaultPlanets();
scene.add(sun.mesh);

var animate = () => {
    planets.forEach(planet => {
        planet.rot();
        planet.orbit();
    });
    sun.rot();
    renderer.render(scene, camera);
}

var populateScene = () => {
    planets.forEach(planet => {
        const mesh = planet.mesh;
        const obj = new GL.Object3D();
        obj.add(mesh); 
        scene.add(obj);
        mesh.position.x = planet.parent[1];
        planet.model = obj;
    });
}

populateScene();
renderer.setAnimationLoop(animate);

window.onresize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

