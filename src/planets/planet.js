import * as GL from 'three';
import { TextureLoader } from 'three';

export default class Planet {
    constructor(name, mass, radius, parent=undefined, texturePath=undefined) {
        this.textureRenderer = new GL.TextureLoader();
        this.rotVel = 0.004;
        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.parent = parent;
        this.texturePath = texturePath
        this.geometry = new GL.SphereGeometry(this.radius, 30, 30);
        if(this.texturePath) {
            this.texture = new GL.MeshBasicMaterial({map: this.textureRenderer.load(this.texturePath)});
        }
        else {
            //get from default texture values
        }
        this.mesh = new GL.Mesh(this.geometry, this.texture);
        if(this.parent) {
            parent['planet'].mesh.add(this.mesh);
            this.mesh.position.x = this.parent['distance'];
        }
    }

    rot() {
        this.mesh.rotateY(this.rotVel);
    }

    addPlanet(scene) {
        scene.add(this.mesh);
    }

}