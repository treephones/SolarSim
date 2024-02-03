import * as GL from 'https://cdn.skypack.dev/three@0.135.0';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js";
import Planet from './planets/planet.js';

const planetData = [
    {
        "name": "Mercury",
        "mass": 0,
        "radius": 3,
        "rotationVelocity": 0.004,
        "orbitVelocity": 0.04,
        "sunDistance": 28,
        "texturePath": "./textures/mercurymap.jpg",
        "link": "https://solarsystem.nasa.gov/planets/mercury/in-depth/",
        "desc": "The smallest planet in our solar system and nearest to the Sun, Mercury is only slightly larger than Earth's Moon.()From the surface of Mercury, the Sun would appear more than three times as large as it does when viewed from Earth, and the sunlight would be as much as seven times brighter. Despite its proximity to the Sun, Mercury is not the hottest planet in our solar system – that title belongs to nearby Venus, thanks to its dense atmosphere.()Because of Mercury's elliptical – egg-shaped – orbit, and sluggish rotation, the Sun appears to rise briefly, set, and rise again from some parts of the planet's surface. The same thing happens in reverse at sunset."
    },
    {
        "name": "Venus",
        "mass": 0,
        "radius": 5.8,
        "rotationVelocity": 0.002,
        "orbitVelocity": 0.015,
        "sunDistance": 44,
        "texturePath": "./textures/venusmap.jpg",
        "link": "https://solarsystem.nasa.gov/planets/venus/in-depth/",
        "desc": "Venus is the second planet from the Sun and is Earth’s closest planetary neighbor. It’s one of the four inner, terrestrial (or rocky) planets, and it’s often called Earth’s twin because it’s similar in size and density. These are not identical twins, however – there are radical differences between the two worlds.()Venus has a thick, toxic atmosphere filled with carbon dioxide and it’s perpetually shrouded in thick, yellowish clouds of sulfuric acid that trap heat, causing a runaway greenhouse effect. It’s the hottest planet in our solar system, even though Mercury is closer to the Sun. Surface temperatures on Venus are about 900 degrees Fahrenheit (475 degrees Celsius) – hot enough to melt lead. The surface is a rusty color and it’s peppered with intensely crunched mountains and thousands of large volcanoes. Scientists think it’s possible some volcanoes are still active."
    },
    {
        "name": "Earth",
        "mass": 0,
        "radius": 6.1,
        "rotationVelocity": 0.02,
        "orbitVelocity": 0.01,
        "sunDistance": 62,
        "texturePath": "./textures/earthmap1k.jpg",
        "link": "https://solarsystem.nasa.gov/planets/earth/in-depth/",
        "desc": "Our home planet is the third planet from the Sun, and the only place we know of so far that’s inhabited by living things.()While Earth is only the fifth largest planet in the solar system, it is the only world in our solar system with liquid water on the surface. Just slightly larger than nearby Venus, Earth is the biggest of the four planets closest to the Sun, all of which are made of rock and metal.()The name Earth is at least 1,000 years old. All of the planets, except for Earth, were named after Greek and Roman gods and goddesses. However, the name Earth is a Germanic word, which simply means “the ground.”"
    },
    {
        "name": "Mars",
        "mass": 0,
        "radius": 4,
        "rotationVelocity": 0.018,
        "orbitVelocity": 0.008,
        "sunDistance": 78,
        "texturePath": "./textures/marsmap1k.jpg",
        "link": "https://solarsystem.nasa.gov/planets/mars/in-depth/",
        "desc": "​Mars is the fourth planet from the Sun – a dusty, cold, desert world with a very thin atmosphere. Mars is also a dynamic planet with seasons, polar ice caps, canyons, extinct volcanoes, and evidence that it was even more active in the past.()Mars is one of the most explored bodies in our solar system, and it's the only planet where we've sent rovers to roam the alien landscape.NASA currently has two rovers (Curiosity and Perseverance), one lander (InSight), and one helicopter (Ingenuity) exploring the surface of Mars."
    },
    {
        "name": "Jupiter",
        "mass": 0,
        "radius": 12,
        "rotationVelocity": 0.04,
        "orbitVelocity": 0.002,
        "sunDistance": 100,
        "texturePath": "./textures/jupitermap.jpg",
        "link": "https://solarsystem.nasa.gov/planets/jupiter/in-depth/",
        "desc": "Jupiter has a long history of surprising scientists – all the way back to 1610 when Galileo Galilei found the first moons beyond Earth. That discovery changed the way we see the universe.()Fifth in line from the Sun, Jupiter is, by far, the largest planet in the solar system – more than twice as massive as all the other planets combined.()Jupiter's familiar stripes and swirls are actually cold, windy clouds of ammonia and water, floating in an atmosphere of hydrogen and helium. Jupiter’s iconic Great Red Spot is a giant storm bigger than Earth that has raged for hundreds of years."
    },
    {
        "name": "Saturn",
        "mass": 0,
        "radius": 10,
        "rotationVelocity": 0.038,
        "orbitVelocity": 0.0009,
        "sunDistance": 138,
        "texturePath": "./textures/saturnmap.jpg",
        "link": "https://solarsystem.nasa.gov/planets/saturn/in-depth/",
        "desc": "Saturn is the sixth planet from the Sun and the second-largest planet in our solar system.()Adorned with thousands of beautiful ringlets, Saturn is unique among the planets. It is not the only planet to have rings – made of chunks of ice and rock – but none are as spectacular or as complicated as Saturn's.()Like fellow gas giant Jupiter, Saturn is a massive ball made mostly of hydrogen and helium."
    },
    {
        "name": "Uranus",
        "mass": 0,
        "radius": 7,
        "rotationVelocity": 0.03,
        "orbitVelocity": 0.0004,
        "sunDistance": 176,
        "texturePath": "./textures/uranusmap.jpg",
        "link": "https://solarsystem.nasa.gov/planets/uranus/in-depth/",
        "desc": "Uranus is the seventh planet from the Sun, and has the third-largest diameter in our solar system. It was the first planet found with the aid of a telescope, Uranus was discovered in 1781 by astronomer William Herschel, although he originally thought it was either a comet or a star.()It was two years later that the object was universally accepted as a new planet, in part because of observations by astronomer Johann Elert Bode. Herschel tried unsuccessfully to name his discovery Georgium Sidus after King George III. Instead, the scientific community accepted Bode's suggestion to name it Uranus, the Greek god of the sky, as suggested by Bode.​"
    },
    {
        "name": "Neptune",
        "mass": 0,
        "radius": 7.1,
        "rotationVelocity": 0.032,
        "orbitVelocity": 0.0001,
        "sunDistance": 200,
        "texturePath": "./textures/neptunemap.jpg",
        "link": "https://solarsystem.nasa.gov/planets/neptune/in-depth/",
        "desc": "Dark, cold, and whipped by supersonic winds, ice giant Neptune is the eighth and most distant planet in our solar system.()More than 30 times as far from the Sun as Earth, Neptune is the only planet in our solar system not visible to the naked eye and the first predicted by mathematics before its discovery. In 2011 Neptune completed its first 165-year orbit since its discovery in 1846.()NASA's Voyager 2 is the only spacecraft to have visited Neptune up close. It flew past in 1989 on its way out of the solar system."
    },
    {
        "name": "Pluto",
        "mass": 0,
        "radius": 2.8,
        "rotationVelocity": 0.008,
        "orbitVelocity": 0.00007,
        "sunDistance": 216,
        "texturePath": "./textures/plutomap1k.jpg",
        "link": "https://solarsystem.nasa.gov/planets/dwarf-planets/pluto/in-depth/",
        "desc": "Pluto is a dwarf planet in the Kuiper Belt, a donut-shaped region of icy bodies beyond the orbit of Neptune. There may be millions of these icy objects, collectively referred to as Kuiper Belt objects (KBOs) or trans-Neptunian objects (TNOs), in this distant region of our solar system.()Pluto – which is smaller than Earth’s Moon – has a heart-shaped glacier that’s the size of Texas and Oklahoma. This fascinating world has blue skies, spinning moons, mountains as high as the Rockies, and it snows – but the snow is red.()On July 14, 2015, NASA’s New Horizons spacecraft made its historic flight through the Pluto system – providing the first close-up images of Pluto and its moons and collecting other data that has transformed our understanding of these mysterious worlds on the solar system’s outer frontier."
    }
]

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
    orbVelMod = 1;
    rotVelMod = 1;
    planetDistMod = 1;
    pause.firstChild.className = "fa fa-pause";
    isPaused = false;
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

            let d2 = document.createElement('div');
            d2.className = pClass;
            let label = document.createElement('h2');
            label.textContent = "Description";
            let content = document.createElement('h3');
            content.innerHTML = planet.description.replaceAll("()", "<br><br>");
            let source = document.createElement('h3');
            source.innerHTML = `Read more about ${planet.name} <a id='source' href='${planet.link}' target='_blank'>here.</a>`;
            d2.appendChild(label);
            d2.appendChild(content);
            d2.appendChild(source);

            editor.appendChild(d2);
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
    let rings = [undefined, undefined];
    for(const planet of planetData) {
        if(planet.name == "Saturn") {
            rings = [12,20];
        }
        else if(planet.name == "Uranus") {
            rings = [7,12];
        }
        planets.push(new Planet(planet.name, planet.mass, planet.radius, planet.rotationVelocity, planet.orbitVelocity, [sun, planet.sunDistance], planet.texturePath, rings, planet.desc, planet.link));
        rings = [undefined, undefined];
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
        if(planet.hasRings) {
            planet.ringMesh.position.x = planet.parent[1]*planetDistMod;
        }
    });
    sun.rot(rotVelMod);
    if(lookingAt) {
        let meshLoc = getMeshPosition(lookingAt.mesh);
        camera.position.set(meshLoc.x-50, meshLoc.y+10, meshLoc.z-50);
        camera.lookAt(meshLoc);
    }
    renderer.render(scene, camera);
}

var populateScene = () => {
    planets.forEach(planet => {
        const mesh = planet.mesh;
        const obj = new GL.Object3D();
        obj.add(mesh); 
        if(planet.hasRings) {
            const ringGeometry = new GL.RingGeometry(planet.ringRadiusi, planet.ringRadiuso, 32);
            let texturePath = "";
            switch(planet.name) {
                case "Saturn":
                    texturePath = "./textures/saturnringcolor.png";
                    break;
                case "Uranus":
                    texturePath = "./textures/uranusringcolor.png";
                    break;
                default:
                    //def
            }
            const ringTexture = new GL.MeshBasicMaterial({map: planet.textureRenderer.load(texturePath), side: GL.DoubleSide});
            const ringMesh = new GL.Mesh(ringGeometry, ringTexture);
            obj.add(ringMesh);
            ringMesh.position.x = planet.parent[1];
            ringMesh.rotation.x = -0.5*Math.PI;
            planet.ringMesh = ringMesh;
        }
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

