import * as GL from 'three';

export default class Planet {
    constructor(name, mass, radius, rotVel, orbVel, parent=undefined, texturePath=undefined, rings=[]) {
        this.textureRenderer = new GL.TextureLoader();
        this.name = name;
        this.mass = mass;
        this.radius = radius;
        this.rotVel = rotVel;
        this.orbVel = orbVel;
        this.parent = parent;
        this.texturePath = texturePath;
        this.geometry = new GL.SphereGeometry(this.radius, 32, 32);
        if(this.texturePath) {
            this.texture = new GL.MeshBasicMaterial({map: this.textureRenderer.load(this.texturePath)});
        }
        else {
            //get from default texture values
        }
        this.rings = rings;
        this.mesh = new GL.Mesh(this.geometry, this.texture);
        this.model = undefined;
    }

    rot(modifier) {
        this.mesh.rotateY(this.rotVel*modifier);
    }

    orbit(modifier) {
        this.model.rotateY(this.orbVel*modifier);
    }

}