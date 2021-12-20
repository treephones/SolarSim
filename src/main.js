import * as GL from 'three';
import { PointLight } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Planet from './planets/planet.js';
import planetData from './planets/planets.json';

const pClass = "planetProperty";

//editables
var rotVelMod = 1;
var orbVelMod = 1;

var canvas = document.getElementById("ss");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var editor = document.getElementById("popupEditor");
var navbar = document.getElementById("icon-bar");

var openEditor = () => {
    document.get
    editor.style.width = "30rem";
    navbar.style.visibility = 'hidden';
}
  
var closeEditor = () => {
    while(editor.lastChild.id != 'closer') {
        editor.removeChild(editor.lastChild);
    }
    editor.style.width = "0";
    navbar.style.visibility = 'visible';
}

document.getElementById("closer").onclick = () => {
    closeEditor();
}

document.getElementById("orb").onclick = () => {
    let d = document.createElement('div');
    d.className = pClass;
    let e = document.createElement('h2');
    e.textContent = "Edit Rotation Speed";
    d.appendChild(e);

    let label = document.createElement('h2');
    label.textContent = `${orbVelMod}`;
    d.appendChild(label);

    let slider = document.createElement('input');
    slider.className = 'range';
    slider.type = 'range';
    slider.value = `${orbVelMod}`;
    slider.min = '0';
    slider.max = '19.9';
    slider.step = '0.1';
    slider.onchange = () => {
        let nval = parseFloat(slider.value)+0.1;
        label.textContent = `${nval.toFixed(1)}`;
        orbVelMod = nval;
    }
    slider.onmousemove = () => {
        let nval = parseFloat(slider.value)+0.1;
        label.textContent = `${nval.toFixed(1)}`;
        orbVelMod = nval;
    }
    d.appendChild(slider);
    d.appendChild(document.createElement('hr'));
    editor.appendChild(d);


    e = document.createElement('h2');
    e.textContent = "Edit Orbit Speed";
    e.className = pClass;
    editor.appendChild(e);
    openEditor();
}

var getDefaultPlanets = ()  => {
    let planets = [];
    for(const planet of planetData) {
        planets.push(new Planet(planet.name, planet.mass, planet.radius, planet.rotationVelocity, planet.orbitVelocity, [sun, planet.sunDistance], planet.texturePath));
    }
    return planets;
}

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
// var sunlight = new GL.PointLight(0xffffff, 0, 100);
// sunlight.position.set(12,12,12);
// scene.add(sunlight);

const starbox = './textures/starbox.jpg';
const skyBoxLoader = new GL.CubeTextureLoader();
scene.background = skyBoxLoader.load([starbox,starbox,starbox,starbox,starbox,starbox]);

let sun = new Planet("Sun", 0, 20, 0.004, 0, undefined, './textures/sunmap.jpg');
const planets = getDefaultPlanets();
scene.add(sun.mesh);

var animate = () => {
    planets.forEach(planet => {
        planet.rot(rotVelMod);
        planet.orbit(orbVelMod);
    });
    sun.rot(rotVelMod);
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

