import * as GL from 'three';
import { PointLight } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Planet from './planets/planet.js';
import planetData from './planets/planets.json';

const pClass = "planetProperty";

//editables
var orbVelMod = 1;
var rotVelMod = 1;
var planetDistMod = 1;
var modStore = [];
var isPaused = false;
var lookingAt = undefined;

var canvas = document.getElementById("ss");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var editor = document.getElementById("popupEditor");
var navbar = document.getElementById("icon-bar");

var openEditor = () => {
    editor.style.width = "30rem";
    navbar.style.visibility = 'hidden';
}
  
var closeEditor = () => {
    while(editor.lastChild.id != 'closer') {
        editor.removeChild(editor.lastChild);
    }
    editor.style.width = "0";
    navbar.style.visibility = 'visible';
    if(lookingAt) {
        lookingAt = undefined;
        camera.position.set(-90, 140, 140);
        camera.lookAt(0,0,0);
    }
}

document.getElementById("closer").onclick = () => {
    closeEditor();
    history.pushState("", document.title, window.location.pathname);
}

var createSlider = (min, max, increment) => {
    let slider = document.createElement('input');
    slider.className = 'range';
    slider.type = 'range';
    slider.min = `${min}`;
    slider.max = `${max}`;
    slider.step = `${increment}`;
    return slider;
}
document.getElementById("orb").onclick = () => {
    let head = document.createElement('h1');
    head.className = pClass;
    if(isPaused) {
        head.textContent = "Cannot edit properties while simulation is paused!";
        editor.appendChild(head);
        openEditor();
        return;
    }
    
    head.textContent = "Editable Properties";
    editor.appendChild(head);

    //prop1
    let d = document.createElement('div');
    d.className = `${pClass} top`;
    d.append(document.createElement('hr'));

    let e = document.createElement('h2');
    e.textContent = "Orbit Speed Multiplier";
    d.appendChild(e);

    let label = document.createElement('h2');
    label.textContent = `${orbVelMod}`;
    d.appendChild(label);

    let slider = createSlider(-20.1, 19.9, 0.1);
    slider.value = `${orbVelMod}`;
    slider.onchange = () => {
        let nval = (parseFloat(slider.value)).toFixed(1);
        label.textContent = `${nval}`;
        orbVelMod = nval < 0 ? 1/-nval : nval;
    }
    slider.onmousemove = () => {
        let nval = (parseFloat(slider.value)+0.1).toFixed(1);
        label.textContent = `${nval}`;
        orbVelMod = nval < 0 ? 1/-nval : nval;
    }
    d.appendChild(slider);
    d.appendChild(document.createElement('hr'));

    editor.appendChild(d);

    //prop2
    let d2 = document.createElement('div');
    d2.className = pClass;

    e = document.createElement('h2');
    e.textContent = "Rotation Speed Multiplier";
    d2.appendChild(e);

    let label2 = document.createElement('h2');
    label2.textContent = `${rotVelMod}`;
    d2.appendChild(label2);

    let slider2 = createSlider(-20.1, 19.9, 0.1);
    slider2.value = `${rotVelMod}`;
    slider2.onchange = () => {
        let nval = (parseFloat(slider2.value)).toFixed(1);
        label2.textContent = `${nval}`;
        rotVelMod = nval < 0 ? 1/-nval : nval;
    }
    slider2.onmousemove = () => {
        let nval = (parseFloat(slider2.value)+0.1).toFixed(1);
        label2.textContent = `${nval}`;
        rotVelMod = nval < 0 ? 1/-nval : nval;
    }
    d2.appendChild(slider2);
    d2.appendChild(document.createElement('hr'));

    editor.appendChild(d2);

    //prop3
    let d3 = document.createElement('div');
    d3.className = `${pClass}`;

    e = document.createElement('h2');
    e.textContent = "Planet Distance Modifier";
    d3.appendChild(e);

    let label3 = document.createElement('h2');
    label3.textContent = `${planetDistMod}`;
    d3.appendChild(label3);

    let slider3 = createSlider(0.9, 9.9, 0.1);
    slider3.value = `${planetDistMod}`;
    slider3.onchange = () => {
        let nval = (parseFloat(slider3.value)+0.1).toFixed(1);
        label3.textContent = `${nval}`;
        planetDistMod = Math.abs(nval);
    }
    slider3.onmousemove = () => {
        let nval = (parseFloat(slider3.value)+0.1).toFixed(1);
        label3.textContent = `${nval}`;
        planetDistMod = Math.abs(nval);
    }
    d3.appendChild(slider3);
    d3.appendChild(document.createElement('hr'));

    editor.append(d3);

    openEditor();
}

let pause = document.getElementById('pause');
pause.onclick = () => {
    let fcc = pause.firstChild.className;
    if(fcc == "fa fa-pause") {
        pause.firstChild.className = "fa fa-play";
        modStore = [orbVelMod, rotVelMod];
        orbVelMod = 0;
        rotVelMod = 0;
        isPaused = true;
        pause.title = "Play Simulation";
    }
    else {
        pause.firstChild.className = "fa fa-pause";
        orbVelMod = modStore[0];
        rotVelMod = modStore[1];
        isPaused = false;
        pause.title = "Pause Simulation";
    }
}

document.getElementById('ref').onclick = () => {
    for(let i = scene.children.length - 1; i >= 0; --i) {
        scene.remove(scene.children[i]);
    }
    scene.add(sun.mesh);
    populateScene();
}

document.getElementById('inf').onclick = () => {
    let head = document.createElement('h1');
    head.className = pClass;
    head.textContent = "Planets";
    editor.appendChild(head);

    //prop1
    let d = document.createElement('div');
    d.className = `${pClass} top`;
    d.appendChild(document.createElement('hr'));

    editor.appendChild(d);

    //prop2
    let d2 = document.createElement('div');
    d2.className = pClass;
    planets.forEach(planet => {
        let name = document.createElement('a');
        name.textContent = planet.name;
        name.href = `#${planet.name.toLowerCase()}`;
        d2.appendChild(name);
    });
    editor.appendChild(d2);

    openEditor();
}

window.onhashchange = () => {
    if(window.location.hash == "") {
        return;
    }
    let query = window.location.hash.substring(1);
    for(let planet of planets) {
        if(planet.name.toLowerCase() == query) {
            closeEditor();
            lookingAt = planet;
            let back = document.createElement('a');
            back.className = 'backbtn';
            back.innerHTML = '&larr;';
            back.onclick = () => {
                history.pushState("", document.title, window.location.pathname);
                closeEditor();
                back.style.visibility = 'hidden';
                document.getElementById('inf').click();
            }
            editor.appendChild(back);

            let name = document.createElement('h1');
            name.textContent = planet.name;
            name.className = pClass;
            editor.appendChild(name);
            let d = document.createElement('div');
            d.className = `${pClass} top`;
            d.appendChild(document.createElement('hr'));

            editor.appendChild(d);

            openEditor();
            break;
        }
    }

}

var getMeshPosition = (mesh) => {
    var pos = new GL.Vector3();
    pos.setFromMatrixPosition(mesh.matrixWorld);
    return pos;
}

var getDefaultPlanets = ()  => {
    let planets = [];
    for(const planet of planetData) {
        planets.push(new Planet(planet.name, planet.mass, planet.radius, planet.rotationVelocity, planet.orbitVelocity, [sun, planet.sunDistance], planet.texturePath));
    }
    return planets;
}

//scene properties
const renderDistance = 2000;

const scene = new GL.Scene();
const camera = new GL.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, renderDistance);
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
        planet.mesh.position.x = planet.parent[1]*planetDistMod;
    });
    sun.rot(rotVelMod);
    if(lookingAt) {
        let meshLoc = getMeshPosition(lookingAt.mesh);
        camera.position.set(meshLoc.x-50, meshLoc.y, meshLoc.z-50);
        camera.lookAt(meshLoc);
    }
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

